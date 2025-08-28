document.addEventListener('DOMContentLoaded', () => {

  const tarjetas = [
    { nombre: 'Degradado 2D', tipo: 'gradient' },
    { nombre: 'Gráfica de barras', tipo: 'barChart' },
    { nombre: 'Gusano suave', tipo: 'worm' },
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
        gradient.addColorStop(1, `hsl(${(t+60)%360}, 70%, 50%)`);
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
          ctx.fillStyle = '#0d6efd';
          ctx.fillRect(x, y-h, w, h);
          ctx.strokeRect(x, y-h, w, h);
        });
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'worm') {
      let points = [];
      for(let i=0;i<10;i++) points.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height});
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for(let i=1;i<points.length;i++){
          points[i].x += (Math.random()-0.5)*4;
          points[i].y += (Math.random()-0.5)*4;
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 4;
        ctx.stroke();
        requestAnimationFrame(draw);
      }
      draw();
    }

    if(tipo === 'particles') {
      const particles = Array.from({length: 30}, ()=>{
        return {x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx:(Math.random()-0.5), vy:(Math.random()-0.5), r:Math.random()*5+2}
      });
      function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle = '#6a4c93';
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
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.arc(x,y,size,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();

        x += vx;
        y += vy;
        if(x-size<0||x+size>canvas.width) vx*=-1;
        if(y-size<0||y+size>canvas.height) vy*=-1;

        requestAnimationFrame(draw);
      }
      draw();
    }
  }

});
