document.addEventListener('DOMContentLoaded', () => {

  const tarjetas = [
    { nombre: 'Degradado 2D', tipo: 'gradient' },
    { nombre: 'Gráfica de barras', tipo: 'barChart' },
    { nombre: 'Gusano arrastrándose', tipo: 'worm' },
    { nombre: 'Partículas flotantes', tipo: 'particles' },
    { nombre: 'Figura rebotando', tipo: 'bouncingShape' }
  ];

  const container = document.getElementById('cards-container');

  tarjetas.forEach((tarjeta, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card shadow-sm">
        <canvas id="canvas-${index}"></canvas>
        <div class="card-title">${tarjeta.nombre}</div>
      </div>`;
    container.appendChild(col);

    iniciarAnimacion(`canvas-${index}`, tarjeta.tipo);
  });

  function iniciarAnimacion(canvasId, tipo) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    if(tipo === 'gradient') {
      let t = 0;
      function draw() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsl(${(t)%360}, 80%, 60%)`);
        gradient.addColorStop(1, `hsl(${(t+120)%360}, 70%, 50%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        t += 1;
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'barChart') {
      const bars = Array.from({length: 8}, () => Math.random());
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        bars.forEach((v,i)=>{
          const w = canvas.width / bars.length * 0.6;
          const x = i * canvas.width / bars.length + (canvas.width/bars.length - w)/2;
          const y = canvas.height;
          const h = v * canvas.height * Math.abs(Math.sin(Date.now()*0.002));
          ctx.fillStyle = `hsl(${(i*40)%360}, 80%, 50%)`;
          ctx.fillRect(x, y-h, w, h);
          ctx.strokeRect(x, y-h, w, h);
        });
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'worm') {
      const segments = 15;
      let t = 0;
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<segments;i++){
          const angle = (t/20) + i*0.5;
          const x = canvas.width/2 + Math.sin(angle)*80;
          const y = canvas.height/2 + Math.cos(angle*1.5)*40;
          const radius = 18 - i; // segmentos más pequeños hacia atrás
          ctx.beginPath();
          ctx.arc(x,y,Math.max(radius,5),0,Math.PI*2);
          ctx.fillStyle = `hsl(${(t*3 + i*20)%360}, 80%, 55%)`;
          ctx.fill();
        }
        t += 2;
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'particles') {
      const particles = Array.from({length: 40}, ()=>{
        return {x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-0.5)*1.5, vy:(Math.random()-0.5)*1.5, r:Math.random()*4+2}
      });
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle = `hsl(${(p.x+p.y)%360}, 70%, 60%)`;
          ctx.fill();
          p.x += p.vx;
          p.y += p.vy;
          if(p.x<0||p.x>canvas.width) p.vx*=-1;
          if(p.y<0||p.y>canvas.height) p.vy*=-1;
        });
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'bouncingShape') {
      let x = canvas.width/2, y=canvas.height/2;
      let vx = 2, vy=2;
      const size = 40;
      function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#4ecdc4';
        ctx.strokeStyle='#1e3a8a';
        ctx.lineWidth=3;
        ctx.beginPath();
        ctx.rect(x-size/2,y-size/2,size,size);
        ctx.fill();
        ctx.stroke();

        x += vx;
        y += vy;
        if(x-size/2<0||x+size/2>canvas.width) vx*=-1;
        if(y-size/2<0||y+size/2>canvas.height) vy*=-1;

        requestAnimationFrame(draw);
      }
      draw();
    }
  }

});
