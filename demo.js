(function(){

  // 0->1, #000000 -> #ffffff
  function grey(v){
    
    // snap to black/white
    v = v < 0.2 ? 0 : v > 0.8 ? 1 : v

    var g = (~~(v*255)).toString(16);

    if(g.length == 1) g = '0' + g;

    return '#' + g + g + g;
  }

  // h - [0,360], s - [0,1], l - [0,1]
  function hsl_basic(h,s,l){
    h = h % 360; // s = s % 1; l = l % 1;
    return 'hsl('+Math.round(h)+', '+Math.round(s*100)+'%, '+(l*100)+'%)'
  }

  function Demo(ui, timings, data){
    // pull out the ui
    this.el = ui.el;
    this.timings = timings;
    this.data = data;

    // add each of the steps

    // initial tween
    this.lastTween = new TWEEN.Tween({})
      .to({}, 10000)
      .start(this.now = 0.01);


    // this._pulses();
    // this.blank(10000)

    this._angles();
    this.blank(10000)

    this._movement();
    this.blank(10000)

    this._rotation();
    this.blank(10000);

    // close
    this.queue(
      new TWEEN.Tween({})
      .to({}, 1000)
      .onStart(function(){
        window.stop && window.stop();
      })
    )

  }

  Demo.prototype._pulses = function(){
    var self = this;
    var el = this.el;

    var cycle = 15000;

    function bg(timing){

        var l = Math.round((Math.sin( ( (self.now + timing) / cycle) * Math.PI*2 )) *200);
        if(l > 50) l = 50;
        if(l < -50) l = -50;

        l += 50;

        return hsl_basic(150, .5, l/100)
    }

    this.queue(
      new TWEEN.Tween({t:0})
      .to({t:10}, 15000)
      .onUpdate(function(){
        self.el.style.background = bg(timings[0])
      })
    )

    this.queue(
      new TWEEN.Tween({t:0})
      .to({t:10}, 15000)
      .onUpdate(function(){
        self.el.style.background = bg(timings[1])
      })
    )

    this.queue(
      new TWEEN.Tween({t:0})
      .to({t:10}, 15000)
      .onUpdate(function(){
        self.el.style.background = bg(timings[2])
      })
    )

  }


  Demo.prototype._angles = function(){
    var data = this.data
        self = this;

    var color = {
      h: (data.a1/(Math.PI))*180,
      s: 0.5,
      l: 0
    };

    function update(){
      self.el.style.background = hsl_basic(this.h, this.s, this.l)
    }

    function mod(n, m){
      return ((n % m) + m) % m
    }


    this.queue(
      new TWEEN.Tween(color)
      .to({l:.5}, 1000)
      .onUpdate(update)
    )

    this.blank(8000)

    this.queue(
      new TWEEN.Tween(color)
      .to({h:(data.a2/(Math.PI))*180}, 1000)
      .onUpdate(update)
    )

    this.blank(8000)

    this.queue(
      new TWEEN.Tween(color)
      .to({l:0}, 1000)
      .onUpdate(update)
    )


    this.blank(8000)

    this.queue(
      new TWEEN.Tween(color)
      .to({h:mod(data.x*30, 360), l:.5}, 1000)
      .onUpdate(update)
    )

    this.blank(8000)



    this.queue(
      new TWEEN.Tween(color)
      .to({h:mod(data.y*30, 360)}, 1000)
      .onUpdate(update)
    )

    this.blank(8000)



    this.queue(
      new TWEEN.Tween(color)
      .to({l:0}, 1000)
      .onUpdate(update)
    )

  }


  Demo.prototype._movement = function(){
    var data = this.data
        self = this;

    function bg(on){
      self.el.style.background = on ? '#fff' : '#000'
    }

    // from me, up
    this.queue(
      new TWEEN.Tween({y:-1})
        .to({y:15}, 5000)
        .onUpdate(function() {
          bg(this.y > data.y)
        })
        .repeat(1)
        .yoyo(true)
    )

    this.blank(5000)


    // from me, up (faster)
    // this.queue(
    //   new TWEEN.Tween({y:-1})
    //     .to({y:15}, 2000)
    //     .onUpdate(function() {
    //       bg(this.y > data.y)
    //     })
    //     .repeat(1)
    //     .yoyo(true)
    // )

    // this.blank(5000)


    // // from me, up (faster)
    // this.queue(
    //   new TWEEN.Tween({y:-1})
    //     .to({y:15}, 1000)
    //     .onUpdate(function() {
    //       bg(this.y > data.y)
    //     })
    //     .repeat(1)
    //     .yoyo(true)
    // )

    // this.blank(5000)


    // left to right
    this.queue(
      new TWEEN.Tween({x:-5})
        .to({x:5}, 5000)
        .onUpdate(function() {
          bg(this.x > data.x)
        })
        .repeat(1)
        .yoyo(true)
    )



    // right to left
    this.queue(
      new TWEEN.Tween({x:5})
        .to({x:-5}, 5000)
        .onUpdate(function() {
          bg(this.x < data.x)
        })
        .repeat(1)
        .yoyo(true)
    )



  }



  Demo.prototype._rotation = function(){
    var data = this.data
        self = this;

    function bg(c){
      self.el.style.background = c;
    }

    // angle from point in middle, up 2

    var a = Math.atan2(data.x, data.y-6);
    if(a < 0){
      a   = (a + Math.PI*2);// 0 -> Math.PI*2
    }


    function vibrate(n){
      navigator.vibrate && navigator.vibrate(n || 200);
    }



    // from me, up
    // this.queue(
    //   new TWEEN.Tween({y:-1})
    //     .to({y:15}, 5000)
    //     .onUpdate(function() {
    //       bg(this.y > data.y)
    //     })
    //     .repeat(1)
    //     .yoyo(true)
    // )

    // this.blank(5000)

    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 10000)
        .onStart(function(){
          setTimeout(function(){
          play();
          bg('#fff');
          vibrate();
        }, (a/(Math.PI*2))*10000)})
        .onUpdate(noop)
    )


    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 5000)
        .onStart(function(){
          setTimeout(function(){
          play();
          bg('#f08');
          vibrate();
        }, (a/(Math.PI*2))*5000)})
        .onUpdate(noop)
    )


    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 5000)
        .onStart(function(){
          setTimeout(function(){
          play();
          bg('#08f');
          vibrate();
        }, (a/(Math.PI*2))*5000)})
        .onUpdate(noop)
    )


    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 2000)
        .onStart(function(){
          setTimeout(function(){
          play();
          bg('#fc0');
          vibrate();
        }, (a/(Math.PI*2))*2000)})
        .onUpdate(noop)
    )



    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 1000)
        .onStart(function(){
          setTimeout(function(){
          play();
          bg('#fff');
          vibrate();
        }, (a/(Math.PI*2))*1000)})
        .onUpdate(noop)
    )


    this.blank(5000);

    this.queue(
      new TWEEN.Tween({t:0})
        .to({t:1}, 1000)
        .onStart(function(){
          play();
          bg('#000');
          vibrate(500);
        })
        .onUpdate(noop)
    )



  }





  Demo.prototype.blank = function(millis){
    this.queue(
      new TWEEN.Tween({t:0})
      .to({t:1}, millis)
    )
  }

  Demo.prototype.queue = function(tween){
    this.lastTween.chain(this.lastTween = tween)
  }

  Demo.prototype.update = function(t){
    this.now = t;
    TWEEN.update(t);
  }


  window.Demo = Demo;

  function noop(){}

})();
