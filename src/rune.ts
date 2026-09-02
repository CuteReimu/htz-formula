let lessThen4 = 0, lessThen5 = 0, result = 0;
const results: number[] = [];

const newTest = (log: string, fn: () => void): void => {
    console.log(log);
    lessThen4 = 0;
    lessThen5 = 0;
    results.length = 0;
    for (let i = 0; i < 10000; i++) {
        result = 0;
        fn();
        results.push(result);
    }
    results.sort((a, b) => a - b);
    console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
    console.log("95%置信区间：", results.at(250), "~", results.at(-250));
};

const getColor = (v: number) => v % 5;
const getCharacter = (v: number) => v % 8;

// 随机符石的个数
const randLine = (): number[] => {
    result++;
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
    const line = Array.from({length: count}, () => Math.floor(Math.random() * 55));
    line.sort((a, b) => a - b);
    return line
};

const findTwoSame = (arr: number[]) => arr.find((v, index, arr) => index > 0 && v === arr[index - 1]);

const newTestTwoSame = (log: string, predicate: (v: number) => boolean): void => {
    newTest(log, () => {
        let cur = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            while (true) {
                const v = findTwoSame(randLine());
                if (v && predicate(v)) { // 随出任意两个相同有字符石
                    cur[i] = v;
                    if (i < 2 || cur[2] !== cur[0] && cur[2] !== cur[1]) {
                        if (i == 2 && cur[0] !== cur[1]) {
                            // 第三个和前两个有一个相同，但前两个不同，重新随一个相同的
                            let v: number | undefined;
                            do {
                                v = findTwoSame(randLine());
                            } while (!v || v !== cur[2]);
                        }
                        break;
                    }
                }
            }
        }
    });
};

const newTestSpecific = (log: string, predicate: (v: number) => boolean): void => {
    newTest(log, () => {
        for (let i = 0; i < 3; i++) {
            while (true) {
                let count = 0;
                for (const v of randLine()) {
                    if (predicate(v)) count++;
                }
                if (count >= 2) break;
            }
        }
    });
};
newTestTwoSame("===========六个完全相同的符石===========", v => v >= 15);
newTestSpecific("===========六金===========", v => v >= 15 && getColor(v) === 0);
newTestSpecific("===========六乾===========", v => v >= 15 && getCharacter(v) === 0);
newTestSpecific("===========六金乾===========", v => v === 15);
newTestTwoSame("===========六金同字===========", v => v >= 15 && getColor(v) === 0);
newTestSpecific("===========六中庸===========", v => v < 15);