export function laplacianSOR(nx, ny, tol, omega, b, maxIter) {
    // Initialize the solution matrix x and set all values to 0
    const x = [];
    for (let i = 0; i < ny; i++) {
      const temp = [];
      for (let j = 0; j < nx; j++) {
        temp.push(0);
      }
      x.push(temp);
    }
    // 최대 반복 횟수 정의 및 반복 카운터 초기화
    let iter = 0;
  
    // 오차를 허용 오차(tol)보다 큰 값으로 초기화
    let error = 1;
  
    // 오류가 허용 오차보다 작거나 최대 반복 횟수에 도달할 때까지 계속 반복
    while (error > tol && iter < maxIter) {
      error = 0;
  
      // SOR을 적용하여 x matrix UPdate
      for (let i = 1; i < ny - 1; i++) {
        for (let j = 1; j < nx - 1; j++) {
          const temp = x[i][j];
          x[i][j] = (1 - omega) * x[i][j] + omega * (x[i - 1][j] + x[i + 1][j] + x[i][j - 1] + x[i][j + 1] - b[i][j]) / 4.0;
          error += Math.abs(x[i][j] - temp);
        }
      }
  
      iter++;
    }
    return x;
  }
  