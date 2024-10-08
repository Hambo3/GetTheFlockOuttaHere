var TinySound = function (s) {
    
  // https://github.com/KilledByAPixel/ZzFX
  
  let zzfx,zzfxV,zzfxX;

  zzfxV=.5;    // volume
  zzfx= (p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n||=1);p=zzfxX.createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination);b.start();return b}
  zzfxX=new(AudioContext||webkitAudioContext) // audio context
      
  var snds = s;

    function play(n) {
      zzfx(...snds[n]);
      }
    
      return{
          Play: function(n)
          {
              play(n);
          }
      }
    }
  
    
    var ShitMusic = function () {
      
      var score = [0,2,3,4,2,3];
      var tune = [0,2,3,4,2,3];
      var notes = [
          [.4,0,110,.03,.66,.28,,3.5,,,,,,.1,,,,.47,.08],//A0
          [.4,0,82,.03,.66,.28,,3.5,,,,,,.1,,,,.47,.08],// E0

          [.2,0,123,.03,.66,.28,,3.5,,,,,,.1,,,,.47,.08],// B0
          [.2,0,65,.03,.66,.28,,3.5,,,,,,.1,,,,.47,.08],// C0
          [.2,0,97,.03,.66,.28,,3.5,,,,,,.1,,,,.47,.08]// G0
      ];

      var tm = new Timer(0);
      var snd = new TinySound(notes);
      var n = 0;
      var m = 0;
      var f = 1;
      var x = 0;
      var t = 0;
        return{
            Play: function(s, u)
            {
              t=u;
              n=0;
              x=0;
              f=s||1;
              tm.Set(1);
            },
            Stop: function(r)
            {
              if(r)tm.enabled = 0;
              x=1;
            },
            Update: function(dt){
              if(tm.Update(dt)){
                m=score[n];
                if(n==0) m = Util.OneOf([0,1]);

                snd.Play(m);
                n++;

                if(n==6) {
                  if(x){
                    tm.enabled = 0;
                  }
                  else{
                    n = 0;
                    tm.Set(1.5*f);
                    if(t)
                      score = tune.slice(0, 1).concat(tune.slice(1).sort(() => Math.random() - 0.5));
                    else score = tune;
                  }
                }
                else
                {
                  tm.Set(0.4*f);
                }               
              }
            }
        }
      }
      