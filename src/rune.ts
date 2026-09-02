let lessThen4 = 0, lessThen5 = 0, result = 0;
const results: number[] = [];

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
    return Array.from({length: count}, () => Math.floor(Math.random() * 55));
};

interface TestConfig {
    name: string;
    find: (result: number[], cur: [number, number][]) => [number, number] | boolean | undefined;
    after?: (cur: [number, number][]) => void;
}

const newTest = (d: TestConfig): void => {
    console.log(d.name);
    lessThen4 = 0;
    lessThen5 = 0;
    results.length = 0;
    for (let i = 0; i < 10000; i++) {
        result = 0;
        const cur: [number, number][] = [];
        for (let j = 0; j < 3; j++) {
            while (true) {
                const v = d.find(randLine(), cur);
                if (!v) continue;
                if (typeof v === "boolean") cur.push([0, 0]);
                else cur.push(v);
                break;
            }
        }
        d.after?.(cur);
        results.push(result);
    }
    results.sort((a, b) => a - b);
    console.log("平均值：", results.reduce((a, b) => a + b, 0) / 10000);
    console.log("95%置信区间：", results.at(250), "~", results.at(-250));
};

const filterSame = (arr: number[]): number[] => {
    return arr.filter((v, i, arr) => {
        if (v >= 15) {
            for (let j = i + 1; j < arr.length; j++) {
                if (v === arr[j]) return true;
            }
        }
        return false;
    });
};

newTest({
    name: "===========六个完全相同的符石===========",
    find: (result, cur) => {
        const same = filterSame(result);
        if (same.length === 0) return undefined;
        const v = same.find(v => cur.some(arr => arr[0] === v));
        if (v) return [v, v];
        return cur.length < 2 ? [same[0], same[0]] : undefined;
    },
    after: (cur) => {
        if (cur[0][0] !== cur[1][0]) {
            while (true) {
                const same = filterSame(randLine());
                if (same.some(v => v === cur[2][0])) break;
            }
        }
    }
});

newTest({
    name: "===========六金===========",
    find: result => result.filter(v => v >= 15 && getColor(v) === 0).length >= 2
});

newTest({
    name: "===========六乾===========",
    find: result => result.filter(v => v >= 15 && getCharacter(v) === 0).length >= 2
});

newTest({
    name: "===========六金乾===========",
    find: result => result.filter(v => v === 15).length >= 2
});

newTest({
    name: "===========六金同字===========",
    find: (result, cur) => {
        const same = filterSame(result).filter(v => getColor(v) === 0);
        if (same.length === 0) return undefined;
        const v = same.find(v => cur.some(arr => arr[0] === v));
        if (v) return [v, v];
        return cur.length < 2 ? [same[0], same[0]] : undefined;
    },
    after: (cur) => {
        if (cur[0][0] !== cur[1][0]) {
            while (true) {
                const same = filterSame(randLine());
                if (same.some(v => v === cur[2][0])) break;
            }
        }
    }
});

newTest({
    name: "===========六中庸===========",
    find: result => result.filter(v => v < 15).length >= 2
});