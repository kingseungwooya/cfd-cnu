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


export function gaussSeidel(A, b, x0, epsilon, maxIter) {
    var n = A.length;
    var x = x0.slice();
    var iteration = 0;
    var error = Infinity;

    while (error > epsilon && iteration < maxIter) {
        for (var i = 0; i < n; i++) {
            var sum = 0;
            for (var j = 0; j < n; j++) {
                if (i !== j) {
                    sum += A[i][j] * x[j];
                }
            }
            x[i] = (b[i] - sum) / A[i][i];
        }
        error = norm(subtract(x, x0));
        x0 = x.slice();
        iteration++;
    }
    return x;
}

export function SOR(A, b, x0, omega, epsilon, maxIter) {
    var n = A.length;
    var x = x0.slice();
    var iteration = 0;
    var error = Infinity;

    while (error > epsilon && iteration < maxIter) {
        for (var i = 0; i < n; i++) {
            var sum = 0;
            for (var j = 0; j < n; j++) {
                if (i !== j) {
                    sum += A[i][j] * x[j];
                }
            }
            x[i] = x[i] + omega * (b[i] - sum) / A[i][i] - x[i];
        }
        error = norm(subtract(x, x0));
        x0 = x.slice();
        iteration++;
    }
    return x;
};