function Riffle(rounds) {

  function _setRound(roundNumber){
    _rounds = roundNumber;
    return true;
  }

  var _rounds = rounds
    , _reloadingMechanism;

  // Encapsulation in JS (cool)
  return function(){
    return {

      fire: function(){
        if(_reloadingMechanism.isReloading()){
          throw new Error("still loading")
        }
        if(_rounds>0){
          return "fire";
        }else{
          return "click";
        }
      },

      getRounds: function(){
        return _rounds;
      },
      setReloadingMechanism: function(mechanism){
        _reloadingMechanism = mechanism;
      },
      reload: function(roundNumber){
        if (_rounds>0){
          return false
        }else{
          return _setRound(roundNumber);
        }
      }
    }
  }();
}

function ReloadingMechanism(){
  var isLoaded=true;
  
  return function(){
    return{
      reload: function(callBack){
        return callBack();
      }
    }
  }();
}

describe('Shooting with the riffle', function() {

  var riffle;


  it('accepts rounds as an argument', function(){
    riffle = new Riffle(2);
    expect(riffle.getRounds()).toEqual(2);
  });


  describe('uses a reload mechanism', function(){
    beforeEach(function(){
      riffle = new Riffle(2);
    })

    it('takes a reloading mechanism', function(){
      riffle.setReloadingMechanism(new ReloadingMechanism());
    });

  });


  describe('when it is loaded', function(){

    beforeEach(function(){
      riffle = new Riffle(2);
      riffle.setReloadingMechanism({ isReloading: function(){ return false; }});
    });

    it('shoots', function() {
      expect(riffle.fire()).toEqual("fire");
    });


    it('expels a round when fired', function(){
      expect(riffle.fire()).toEqual("fire");
    });


    it('returns false when reloaded', function(){
      expect(riffle.reload()).toBe(false);
    })

  });


  describe('when it is empty', function(){

    beforeEach(function(){
      riffle = new Riffle(0);
      riffle.setReloadingMechanism({ isReloading: function(){ return false; }});
    })

    it('will not fire when empty', function(){
      expect(riffle.fire()).toEqual("click");
    });


    it('returns true when reloaded', function(){
      expect(riffle.reload(2)).toBe(true);
    })

  })


  describe('when its reloading', function(){

    beforeEach(function(){
      riffle = new Riffle(0);
      riffle.setReloadingMechanism({ isReloading: function(){ return true; }});
    });

    it('raises exception if triggered', function(){

      riffle.reload(2);

      expect(function(){
        riffle.fire()
      }).toThrow('still loading');

    });
  });


  describe('after reloading', function(){
    beforeEach(function(){
       riffle = new Riffle(0);
       riffle.setReloadingMechanism({ isReloading: function(){ return false } });
       riffle.reload(1);
     });

     it('it should return true when fired', function(){
       expect(riffle.fire()).toBe('fire');
     });
  });

});
