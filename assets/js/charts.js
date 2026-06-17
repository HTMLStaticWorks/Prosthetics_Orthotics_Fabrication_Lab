document.addEventListener('DOMContentLoaded', () => {
  initLimbPressureHeatmap();
  initGaitVelocityChart();
  initFabricationQueueChart();
  
  // Re-render charts on RTL change if text alignment inside SVGs needs adjustment
  window.addEventListener('rtlchanged', () => {
    initLimbPressureHeatmap();
    initGaitVelocityChart();
    initFabricationQueueChart();
  });
});

// Helper: Clear container before drawing
function clearChartContainer(id) {
  const container = document.getElementById(id);
  if (container) {
    container.innerHTML = '';
    return container;
  }
  return null;
}

// 1. Limb Pressure Heatmap (Home 2 / Outcome Reports)
function initLimbPressureHeatmap() {
  const container = clearChartContainer('socket-pressure-heatmap');
  if (!container) return;
  
  const points = [
    { x: 2, y: 1, val: 20 }, { x: 3, y: 1, val: 30 }, { x: 4, y: 1, val: 25 },
    { x: 1, y: 2, val: 35 }, { x: 2, y: 2, val: 70 }, { x: 3, y: 2, val: 85 }, { x: 4, y: 2, val: 65 }, { x: 5, y: 2, val: 30 },
    { x: 1, y: 3, val: 40 }, { x: 2, y: 3, val: 95 }, { x: 3, y: 3, val: 98 }, { x: 4, y: 3, val: 90 }, { x: 5, y: 3, val: 45 },
    { x: 1, y: 4, val: 30 }, { x: 2, y: 4, val: 75 }, { x: 3, y: 4, val: 80 }, { x: 4, y: 4, val: 70 }, { x: 5, y: 4, val: 35 },
    { x: 2, y: 5, val: 25 }, { x: 3, y: 5, val: 40 }, { x: 4, y: 5, val: 30 }
  ];
  
  const width = container.clientWidth || 300;
  const height = 240;
  const rows = 5;
  const cols = 5;
  const cellW = width / (cols + 2);
  const cellH = height / (rows + 2);
  
  let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full h-full text-gray-500 dark:text-gray-400">`;
  
  // Draw grid background
  for (let r = 0; r <= rows + 1; r++) {
    const y = r * cellH;
    svg += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="currentColor" stroke-opacity="0.05" stroke-dasharray="3,3" />`;
  }
  for (let c = 0; c <= cols + 1; c++) {
    const x = c * cellW;
    svg += `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="currentColor" stroke-opacity="0.05" stroke-dasharray="3,3" />`;
  }
  
  // Render heatmap nodes
  points.forEach((pt) => {
    const cx = pt.x * cellW + cellW/2;
    const cy = pt.y * cellH + cellH/2;
    
    // Choose color gradient based on pressure percentage (val)
    let color = 'rgba(103, 232, 249, 0.35)'; // soft cyan low pressure
    if (pt.val > 80) {
      color = 'rgba(15, 76, 129, 0.95)'; // deep blue high pressure
    } else if (pt.val > 50) {
      color = 'rgba(20, 184, 166, 0.8)'; // mid teal pressure
    } else if (pt.val > 30) {
      color = 'rgba(103, 232, 249, 0.7)'; // solid cyan
    }
    
    svg += `
      <g class="cursor-pointer group">
        <circle cx="${cx}" cy="${cy}" r="0" fill="${color}" class="animate-pulse">
          <animate attributeName="r" from="0" to="${cellW * 0.7}" dur="1s" fill="freeze" />
        </circle>
        <circle cx="${cx}" cy="${cy}" r="${cellW * 0.7}" fill="transparent" />
        <title>Sensor Grid: ${pt.x},${pt.y} - Pressure: ${pt.val}%</title>
      </g>
    `;
  });
  
  svg += '</svg>';
  container.innerHTML = svg;
}

// 2. Gait Velocity Chart (Case Studies / Analytics)
function initGaitVelocityChart() {
  const container = clearChartContainer('gait-velocity-chart');
  if (!container) return;
  
  const width = container.clientWidth || 400;
  const height = 240;
  const padding = 40;
  
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  
  // Data: [Month, Before Fitting, After Fitting]
  const data = [
    { label: isRTL ? 'يناير' : 'Jan', before: 0.6, after: 1.1 },
    { label: isRTL ? 'فبراير' : 'Feb', before: 0.7, after: 1.2 },
    { label: isRTL ? 'مارس' : 'Mar', before: 0.7, after: 1.35 },
    { label: isRTL ? 'أبريل' : 'Apr', before: 0.8, after: 1.5 },
    { label: isRTL ? 'مايو' : 'May', before: 0.85, after: 1.62 }
  ];
  
  const graphW = width - padding * 2;
  const graphH = height - padding * 2;
  
  // Grid Lines and Axes
  let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full h-full text-gray-500 dark:text-gray-400 font-sans">`;
  
  // Y-axis grid
  for (let i = 0; i <= 4; i++) {
    const val = (0.5 * i).toFixed(1);
    const y = height - padding - (val / 2.0) * graphH;
    svg += `
      <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" />
      <text x="${isRTL ? width - padding + 10 : padding - 10}" y="${y + 4}" text-anchor="${isRTL ? 'start' : 'end'}" class="text-[10px] fill-current">${val} m/s</text>
    `;
  }
  
  // Map x coords
  const points = data.map((d, index) => {
    const fract = index / (data.length - 1);
    // If RTL, flip coordinates horizontally
    const x = isRTL 
      ? (width - padding - fract * graphW) 
      : (padding + fract * graphW);
    const yBefore = height - padding - (d.before / 2.0) * graphH;
    const yAfter = height - padding - (d.after / 2.0) * graphH;
    
    return { x, yBefore, yAfter, label: d.label, before: d.before, after: d.after };
  });
  
  // Generate paths
  let pathBefore = `M ${points[0].x} ${points[0].yBefore}`;
  let pathAfter = `M ${points[0].x} ${points[0].yAfter}`;
  
  for (let i = 1; i < points.length; i++) {
    pathBefore += ` L ${points[i].x} ${points[i].yBefore}`;
    pathAfter += ` L ${points[i].x} ${points[i].yAfter}`;
  }
  
  // Draw Lines
  svg += `
    <path d="${pathBefore}" fill="none" stroke="#BBDDF4" stroke-width="3" stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" to="0" dur="1.2s" fill="freeze" />
    </path>
    <path d="${pathAfter}" fill="none" stroke="#14B8A6" stroke-width="3" stroke-dasharray="1000" stroke-dashoffset="1000">
      <animate attributeName="stroke-dashoffset" to="0" dur="1.2s" fill="freeze" />
    </path>
  `;
  
  // Draw Data dots and labels
  points.forEach((pt) => {
    svg += `
      <circle cx="${pt.x}" cy="${pt.yBefore}" r="4" fill="#0F4C81" stroke="#BBDDF4" stroke-width="2" class="cursor-pointer">
        <title>Before: ${pt.before} m/s</title>
      </circle>
      <circle cx="${pt.x}" cy="${pt.yAfter}" r="4" fill="#115E59" stroke="#14B8A6" stroke-width="2" class="cursor-pointer">
        <title>After Fit: ${pt.after} m/s</title>
      </circle>
      <text x="${pt.x}" y="${height - padding + 18}" text-anchor="middle" class="text-[10px] fill-current font-medium">${pt.label}</text>
    `;
  });
  
  svg += '</svg>';
  container.innerHTML = svg;
}

// 3. Fabrication Queue / Live Timeline Bar Chart (Home 2 / Preview Dashboard)
function initFabricationQueueChart() {
  const container = clearChartContainer('fabrication-queue-chart');
  if (!container) return;
  
  const width = container.clientWidth || 400;
  const height = 240;
  const padding = 40;
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  
  const data = [
    { stage: isRTL ? 'المسح' : 'Scan', count: 42 },
    { stage: isRTL ? 'النمذجة' : 'CAD', count: 28 },
    { stage: isRTL ? 'الطحن' : 'Milling', count: 18 },
    { stage: isRTL ? 'الطباعة' : '3D Print', count: 35 },
    { stage: isRTL ? 'التشطيب' : 'Finish', count: 12 }
  ];
  
  const maxVal = 50;
  const graphW = width - padding * 2;
  const graphH = height - padding * 2;
  const barWidth = graphW / data.length * 0.6;
  const spacing = graphW / data.length;
  
  let svg = `<svg viewBox="0 0 ${width} ${height}" class="w-full h-full text-gray-500 dark:text-gray-400 font-sans">`;
  
  // Grid
  for (let i = 0; i <= 5; i++) {
    const val = 10 * i;
    const y = height - padding - (val / maxVal) * graphH;
    svg += `
      <line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" />
      <text x="${isRTL ? width - padding + 10 : padding - 10}" y="${y + 4}" text-anchor="${isRTL ? 'start' : 'end'}" class="text-[9px] fill-current">${val} units</text>
    `;
  }
  
  // Bars
  data.forEach((d, index) => {
    const barH = (d.count / maxVal) * graphH;
    const fract = index + 0.2;
    // Handle RTL shifting
    const x = isRTL 
      ? (width - padding - fract * spacing - barWidth)
      : (padding + fract * spacing);
    const y = height - padding - barH;
    
    // Choose beautiful colors
    const fill = (index % 2 === 0) ? 'url(#gradPurple)' : 'url(#gradBlue)';
    
    svg += `
      <g class="cursor-pointer group">
        <rect x="${x}" y="${y}" width="${barWidth}" height="0" rx="4" fill="${fill}">
          <animate attributeName="height" from="0" to="${barH}" dur="0.8s" fill="freeze" />
          <animate attributeName="y" from="${height - padding}" to="${y}" dur="0.8s" fill="freeze" />
        </rect>
        <text x="${x + barWidth/2}" y="${y - 6}" text-anchor="middle" class="text-[9px] font-semibold fill-gray-800 dark:fill-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">${d.count}</text>
        <text x="${x + barWidth/2}" y="${height - padding + 18}" text-anchor="middle" class="text-[10px] fill-current font-medium">${d.stage}</text>
      </g>
    `;
  });
  
  // Gradients definition
  svg += `
    <defs>
      <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#49A2DE" />
        <stop offset="100%" stop-color="#0F4C81" />
      </linearGradient>
      <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2DD4BF" />
        <stop offset="100%" stop-color="#0D9488" />
      </linearGradient>
    </defs>
  `;
  
  svg += '</svg>';
  container.innerHTML = svg;
}
