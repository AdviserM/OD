/*
*  求最大公约数
* */
const gcd = (a, b) => {
    if (b === 0) return a
    return gcd(b, a % b)
}

/*
*  求最小公倍数
* */
const lcm = (a, b) => {
    return (a * b) / gcd(a, b)
}

/*
*  求多个数的最大公约数
* */
const ngcd = (arr = []) => {
    if (arr.length >= 2) {
        let a = arr[0]
        let b = arr[1]
        let g = gcd(a, b)
        for (let i = 2; i < arr.length; i++) {
            g = gcd(g, arr[i])
        }
        return g
    } else {
        return []
    }
}

/*
*  求多个数的最小公倍数
* */
const nlcm = (arr = []) => {
    if (arr.length >= 2) {
        let a = arr[0]
        let b = arr[1]
        let g = lcm(a, b)
        for (let i = 2; i < arr.length; i++) {
            g = lcm(g, arr[i])
        }
        return g
    } else {
        return false
    }
}

/*
*  纯英文正则
* */
const enReg = new RegExp(/^[a-zA-Z]+$/, 'g')
const notEnReg = /[^a-zA-Z]+/
/*
*  纯数字正则
* */
const numReg = new RegExp(/^[0-9]+$/, 'g')
let numReg = /[0-9]+/
/*
* 空白符正则 不包含换行
* */
const blankReg = new RegExp(/\s/, 'g')

/*
*  匹配括号内的数据
* */
const bracksReg = /\([^)]+\)/g
// String.match()
/*
*   判断是否是质数
* */
const isZhishu = (n) => {
    if (n <= 3) {
        return n > 1
    }
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false
        }
    }
    return true
}

/*
*  分解因式
* */
const fjys = (n) => {
    let ans = []
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            let b = n / i
            ans.push([i, b])
        }
    }
    console.log(ans)
}

/*
* 二进制或运算
* a 二进制数
* b 二进制数
* */
const huo = (a, b) => {
    let ans = ''
    for (let i = 0; i < a.length; i++) {
        let ai = Number(a[i])
        let bi = Number(b[i])
        ans += ai | bi
    }
    return ans
}

//用连续数表示一个整数 求一个d = 1的等差数列 n为项数
// 等差数列求和公式 Sn = n*a1 + (n(n - 1) * d / 2)    Sn = n*a1 + n(n-1) / 2    2Sn = 2*n*a1 + n(n - 1)     2Sn - n(n-1) = 2n*a1  a1 = (2Sn - n(n-1)) / 2n
// 这题公差为1  已知 Sn
// 找出 符合要求的a1 以及 项数的范围
// 求 a1的公式为 a1 = (2Sn - n(n-1)) / 2n
// n的范围 首项为1时 项数最大 项数应小于 2n = 2Sn - n(n-1)    n(n - 1) + 2n = 2Sn    n*(n+1) <= 2Sn
// 对n进行遍历 找到 符合的首项
// 连续自然数之和表达整数
// Sn = n*a1+(n*(n-1)*d) / 2
const ziranshu = (Sn) => {
    let X = 0
    // n为 项数
    for (let n = 1; n * (n + 1) <= 2 * Sn; n++) {
        if ((2 * Sn - n * (n - 1)) % (2 * n) === 0) {
            let a1 = (2 * Sn - n * (n - 1)) / (2 * n)
            let ans = []
            for (let i = 0; i < n; i++) {
                ans.push(a1++)
            }
            X++
            console.log(`${Sn}=${ans.join('+')}`)
        }
    }
    console.log(`Result:${X}`)
}

/*
*  重要的api
* */
const api = () => {
    ''.charAt()
    ''.charCodeAt()
    String.fromCharCode()
    // Array.sort
    // 1 b 在 a前面 -1 a 在 b 前面 0 不动
}

/*
*  全排列
* */
const quanpailie = (arr = [],m) => {
    const ans = []
    // P(n,m)
    const innerLoop = (temp,_arr) => {
      if(temp.length === m) {
        ans.push(temp)
      }
      _arr.forEach((r,i) => {
          let copyArr = [..._arr]
          copyArr.splice(i,1)
          innerLoop([...temp,r],copyArr)
      })
    }
    innerLoop([],arr)
    return ans
}

/*
*  全组合
* */
const quanzuhe = (arr = [],m) => {
    const ans = []
    // P(n,m)
    const innerLoop = (temp,_arr) => {
        if(temp.length === m) {
            ans.push(temp)
        }
        _arr.forEach((r,i) => {
            innerLoop([...temp,r],_arr.slice(i+1))
        })
    }
    innerLoop([],arr)
    return ans
}

/*
*   dp dfs 查找 调度 二叉树
* */


/*
*  二进制数 可以格式化为8位 矩阵
* */
