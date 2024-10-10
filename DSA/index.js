import axios from "axios";

const init = async () => {
    try {
        const response = await axios.get("https://test-share.shub.edu.vn/api/intern-test/input");
        return response.data;
    } catch (e) {
        console.error(e);
    }
}

const { token, data, query } = await init();

let n = data.length;
let sumResult = new Array(n + 1).fill(0);
let sumEvenResult = new Array(n + 1).fill(0);
let sumOddResult = new Array(n + 1).fill(0);

for (let i = 1; i <= n; i++) {
    sumResult[i] = sumResult[i - 1] + data[i - 1];
    sumEvenResult[i] = sumEvenResult[i - 1];
    sumOddResult[i] = sumOddResult[i - 1];

    if ((i - 1) % 2 === 0) {
        sumEvenResult[i] += data[i - 1];
    } else {
        sumOddResult[i] += data[i - 1];
    }
}


const type1Calc = ([a, b]) => {
    return sumResult[b + 1] - sumResult[a];
};

const type2Calc = ([a, b]) => {
    let even = sumEvenResult[b + 1] - sumEvenResult[a];
    let odd = sumOddResult[b + 1] - sumOddResult[a];
    return even - odd;
};

let answer = [];
for (let i = 0; i < query.length; i++) {
    query[i].type == 1 ?
        answer.push(type1Calc(query[i].range)) :
        answer.push(type2Calc(query[i].range));
}

axios.post("https://test-share.shub.edu.vn/api/intern-test/output", answer, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => {
    console.log('Success:', response.data);
})
.catch(error => {
    console.error('Failed:', error.response ? error.response.data : error.message);
});