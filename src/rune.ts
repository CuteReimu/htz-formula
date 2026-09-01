let lessThen4 = 0, lessThen5 = 0;

// 随机符石的个数
const randCount = (): number => {
    let count: number;
    if (lessThen5 >= 19) {
        count = 5;
    } else if (lessThen4 >= 9) {
        count = 4;
    } else {
        const n = Math.random();
        if (n < 0.4) count = 2;
        else if (n < 0.7) count = 3;
        else if (n < 0.9) count = 4;
        else count = 5;
    }
    switch (count) {
        case 5:
            lessThen5 = 0;
            lessThen4 = 0;
            break;
        case 4:
            lessThen5++;
            lessThen4 = 0;
            break;
        default:
            lessThen5++;
            lessThen4++;
    }
    return count;
};

// 随机两个完全相同的符石
const randTwoSame = (): number => {
    const count = randCount();
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
        const v = Math.floor(Math.random() * 55);
        if (v < 15) continue;
        if (result.includes(v)) return v;
        result.push(v);
    }
    return -1;
};

// 随机两个中庸符石
const randTwoNoNumber = (): boolean => {
    const count = randCount();
    let hasNoNumber = false;
    for (let i = 0; i < count; i++) {
        const v = Math.floor(Math.random() * 55);
        if (v >= 15) continue;
        if (hasNoNumber) return true;
        hasNoNumber = true;
    }
    return false;
};

// 随机两个同色（有字）符石
const randTwoSameColor = (mod: number = 5): number => {
    const count = randCount();
    const result: number[] = [];
    for (let i = 0; i < count; i++) {
        const v = Math.floor(Math.random() * 55);
        if (v < 15) continue;
        const color = v % mod;
        if (result.includes(color)) return color;
        result.push(color);
    }
    return -1;
};

console.log("===========六个完全相同的符石===========");
const results: number[] = [];
for (let i = 0; i < 10000; i++) {
    let result = 0;
    let cur = [0, 0, 0];
    do {
        result++;
        cur[0] = randTwoSame();
    } while (cur[0] <= 0);
    do {
        result++;
        cur[1] = randTwoSame();
    } while (cur[1] <= 0);
    do {
        result++;
        cur[2] = randTwoSame();
    } while (cur[2] != cur[0] && cur[2] != cur[1]);
    if (cur[0] != cur[1]) {
        let v = 0;
        do {
            result++;
            v = randTwoSame();
        } while (v != cur[2]);
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));

lessThen4 = 0;
lessThen5 = 0;
results.length = 0;
console.log("===========六金===========");
for (let i = 0; i < 10000; i++) {
    let result = 0;
    let cur = [0, 0, 0];
    do {
        result++;
        cur[0] = randTwoSameColor();
    } while (cur[0] < 0);
    do {
        result++;
        cur[1] = randTwoSameColor();
    } while (cur[1] < 0);
    do {
        result++;
        cur[2] = randTwoSameColor();
    } while (cur[2] != cur[0] && cur[2] != cur[1]);
    if (cur[0] != cur[1]) {
        let v = 0;
        do {
            result++;
            v = randTwoSameColor();
        } while (v != cur[2]);
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));

lessThen4 = 0;
lessThen5 = 0;
results.length = 0;
console.log("===========六乾===========");
for (let i = 0; i < 10000; i++) {
    let result = 0;
    let cur = [0, 0, 0];
    do {
        result++;
        cur[0] = randTwoSameColor(8);
    } while (cur[0] <= 0);
    do {
        result++;
        cur[1] = randTwoSameColor(8);
    } while (cur[1] <= 0);
    do {
        result++;
        cur[2] = randTwoSameColor(8);
    } while (cur[2] != cur[0] && cur[2] != cur[1]);
    if (cur[0] != cur[1]) {
        let v = 0;
        do {
            result++;
            v = randTwoSameColor(8);
        } while (v != cur[2]);
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));

lessThen4 = 0;
lessThen5 = 0;
results.length = 0;
console.log("===========六金乾===========");
for (let i = 0; i < 10000; i++) {
    let result = 0;
    let cur = 0;
    for (let j = 0; j < 3; j++) {
        do {
            result++;
            cur = randTwoSame();
        } while (cur != 54);
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));

lessThen4 = 0;
lessThen5 = 0;
results.length = 0;
console.log("===========六金同字===========");
for (let i = 0; i < 10000; i++) {
    let result = 0;
    let cur = [0, 0, 0];
    do {
        result++;
        cur[0] = randTwoSame();
    } while (cur[0] <= 0 || cur[0] % 5);
    do {
        result++;
        cur[1] = randTwoSame();
    } while (cur[1] <= 0 || cur[1] % 5);
    do {
        result++;
        cur[2] = randTwoSame();
    } while (cur[2] != cur[0] && cur[2] != cur[1]);
    if (cur[0] != cur[1]) {
        let v = 0;
        do {
            result++;
            v = randTwoSame();
        } while (v != cur[2]);
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));

lessThen4 = 0;
lessThen5 = 0;
results.length = 0;
console.log("===========六中庸===========");
for (let i = 0; i < 10000; i++) {
    let result = 0;
    for (let j = 0; j < 3; j++) {
        do {
            result++;
        } while (!randTwoNoNumber());
    }
    results.push(result);
}
results.sort((a, b) => a - b);
console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
console.log("95%置信区间：", results.at(250), "~", results.at(-250));