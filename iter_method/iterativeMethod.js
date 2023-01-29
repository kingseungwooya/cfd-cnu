export function jacobi(A, b, x0, maxIter, epsilon) {

    let n = A.length;
    let x = x0.slice(); // initialize x with the initial guess
    let diag = Array(n);
    for (let i = 0; i < n; i++) {
        diag[i] = A[i][i];
    }

    for (let iter = 0; iter < maxIter; iter++) {
        let x_prev = x.slice();
        for (let i = 0; i < n; i++) {
            x[i] = b[i];
            for (let j = 0; j < n; j++) {
                if (j != i) {
                    x[i] -= A[i][j] * x_prev[j];
                }
            }
            x[i] /= diag[i];
        }

        let norm = 0;
        for (let i = 0; i < n; i++) {
            norm += (x[i] - x_prev[i]) * (x[i] - x_prev[i]);
        }
        norm = Math.sqrt(norm);

        if (norm < epsilon) {
            return x;
        }
    }
    return x;
}


export function gaussSeidel(A, b, x0, maxIter, epsilon) {
    let n = A.length;
    let x = x0.slice(); // initialize x with the initial guess
    for (let iter = 0; iter < maxIter; iter++) {
        let x_prev = x.slice();
        for (let i = 0; i < n; i++) {
            x[i] = b[i];
            for (let j = 0; j < i; j++) {
                x[i] -= A[i][j] * x[j];
            }
            for (let j = i+1; j < n; j++) {
                x[i] -= A[i][j] * x_prev[j];
            }
            x[i] /= A[i][i];
        }

        let norm = 0;
        for (let i = 0; i < n; i++) {
            norm += (x[i] - x_prev[i]) * (x[i] - x_prev[i]);
        }
        norm = Math.sqrt(norm);

        if (norm < epsilon) {
            return x;
        }
    }
    return x;
}


export function SOR(A, b, x0, maxIter, epsilon, omega) {
    let n = A.length;
    let x = x0.slice(); // initialize x with the initial guess
    for (let iter = 0; iter < maxIter; iter++) {
        let x_prev = x.slice();
        for (let i = 0; i < n; i++) {
            x[i] = b[i];
            for (let j = 0; j < i; j++) {
                x[i] -= A[i][j] * x[j];
            }
            for (let j = i+1; j < n; j++) {
                x[i] -= A[i][j] * x_prev[j];
            }
            x[i] = (1 - omega) * x_prev[i] + omega * (x[i] / A[i][i]);
        }

        let norm = 0;
        for (let i = 0; i < n; i++) {
            norm += (x[i] - x_prev[i]) * (x[i] - x_prev[i]);
        }
        norm = Math.sqrt(norm);

        if (norm < epsilon) {
            return x;
        }
    }
    return x;
}