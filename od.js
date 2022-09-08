/*
*  素数之积
*
* */

// 是否是质数
const isZhi = (n) => {
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
const fenjieyinshi = (n) => {
    let ans = null
    for (let i = 2; i <= Math.sqrt(n);) {
        if (n % i === 0) {
            let other = n / i
            if (isZhi(i) && isZhi((other))) {
                ans = [i, other]
                break
            }
        }
        if (i === 2) {
            i++
        } else {
            i += 2
        }
    }
    if (ans) {
        console.log(ans.join(' '))
    } else {
        console.log('-1 -1')
    }
}


// ipv4 转换为整数
const transformIpv4 = () => {
    let str = '129#0#0#0'
    // 思路 每个数拆分为单个数 先转换为二进制 然后二进制拼接后转换为10进制数
    let strArr = str.split('#')
    if (strArr.length !== 4) {
        return console.log('invalid IP')
    }
    if (Number(strArr[0]) > 128 || Number(strArr[0]) < 1) {
        return console.log('invalid IP')
    }
    for (let i = 1; i < 4; i++) {
        if (Number(strArr[i]) > 255 || Number(strArr[i]) < 0) {
            return console.log('invalid IP')
        }
    }
    let er = strArr.reduce((pre, cur) => {
        let bianary = parseInt(cur, 10).toString(2)
        let len = bianary.length
        // 补0操作 补到8位
        bianary = new Array(8 - len).fill('0').join('') + bianary
        return pre + bianary
    }, '')
    console.log(er)
    console.log(parseInt(er, 2).toString(10))
}

// 寻找相同子串 固定长度的滑动窗口
const findSameStr = () => {
    let str1 = 'AVERDXIVYERDIAN'
    let str2 = 'RDXI'
    let left = 0, right = str2.length, ans = undefined
    while (right <= str1.length) {
        let subStr = str1.slice(left, right)
        if (subStr === str2) {
            ans = left
            break
        }
        left++
        right++
    }
    if (ans !== undefined) {
        console.log(ans + 1)
    } else {
        console.log('No')
    }
}

// 日志排序
const dateTimeSort = () => {
    let str = '1:3:3.4'
    let str2 = '6:2:33.499'
    const toDate = (str) => {
        let [a, b] = str.split('.')
        if (b.length < 3) {
            b = new Array(3 - b.length).fill('0').join('') + b
        }
        a = a.split(':')
        for (let i = 0; i < a.length; i++) {
            if (a[i].length < 2) {
                a[i] = new Array(2 - a[i].length).fill('0').join('') + a[i]
            }
        }
        let newStr = '2020/01/05 ' + a.join(":") + '.' + b
        console.log(newStr, new Date(newStr).toTimeString())
        return {
            a: str, b: new Date(newStr)
        }
    }
    console.log(toDate(str).b > toDate(str2).b)
    // 补0操作
}

// 拼接url
const concatURL = (str) => {
    let [a, b] = str.split(',')
    b = '/' + b
    let newStr = a + b
    let reg = /\/+/g
    console.log(newStr.replace(reg, '/'))
}


// 分糖果 不就是组合吗
const fentangGuo = () => {
    let str = '1 2 3 5'
    let strArr = str.split(' ').map(item => Number(item))
    strArr.sort((a, b) => {
        return a - b
    })
    const sum = (arr) => {
        return arr.reduce((pre, cur) => {
            return pre + cur
        }, 0)
    }
    const getOther = (arr) => {
        return strArr.filter(item => {
            return !arr.includes(item)
        })
    }
    let half = sum(strArr) / 2
    if (half - Math.floor(half) > 0) {
        console.log(-1)
        return
    }
    let ans = []
    const innerLoop = (temp, _arr) => {
        if (temp.length > 0) {
            if (sum(temp) === half) {
                let other = getOther(temp)
                ans.push(temp)
                ans.push(other)
            }
        }
        _arr.forEach((r, i) => {
            innerLoop([...temp, r], _arr.slice(i + 1))
        })
    }
    innerLoop([], strArr)
    console.log(ans, ans.length)
    if (ans.length > 0) {
        console.log(half)
        for (let i = 0; i < strArr.length / 2 - 1; i++) {
            console.log(ans[i].join(' '))
        }
    } else {
        console.log(-1)
    }

}

// 相对开音节
const kaiyinjie = (str) => {
    let strArr = str.split(' ')
    let notEnReg = /[^a-zA-Z]+/
    const reverse = (str) => {
        if (notEnReg.test(str)) return str
        return str.split('').reverse().join('')
    }
    let yuan = 'aeiou'
    // 除了元音就是辅音 正确的相对开音节的结构 fu + yuan + fu(not r) + e
    // 测试 开音节
    const testKai = (str) => {
        let len = str.length
        let count = 0
        if (len < 4) return count
        let left = 0, right = 4
        while (right <= len) {
            let subStr = str.substring(left, right)
            // 有其他不是字母的子串不可能是
            if (notEnReg.test(subStr)) {
                left++
                right++
                continue
            } else {
                let [a, b, c, d] = subStr.split('')
                let flaga = !yuan.includes(a)
                let flagb = yuan.includes(b)
                let flagc = !yuan.includes(c) && c !== 'r'
                let flagd = d === 'e'
                if (flaga && flagb && flagc && flagd) {
                    count++
                }
            }
            left++
            right++
        }
        return count
    }
    let count = 0
    strArr.forEach((item) => {
        let rStr = reverse(item)
        console.log('rStr', rStr)
        count += testKai(rStr)
    })
    console.log(count)
}

const sum = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur
    }, 0)
}

// 数组连续和
//暴力法
const suzulianxuhe1 = () => {
    let [, target] = '3 7'.split(' ').map(n => Number(n))
    let arr = '3 4 7'.split(' ').map(n => Number(n))
    let count = 0

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j <= arr.length; j++) {
            let subArr = arr.slice(i, j)
            let s = sum(subArr)
            if (s > target) {
                break
            }
            if (s === target) {
                count++
            }
        }

    }
    console.log(count)
}

// 矩阵最大值
const juzhengmax = () => {
    let str = `1,0,0,0,1
0,0,0,1,1
0,1,0,1,0
1,0,0,1,1
1,0,1,0,1`
    let arr = str.split('\n')
    let rowMax = (row) => {
        let max = 0
        let rowArr = row.split(',')
        for (let i = 0; i < rowArr.length; i++) {
            let ten = Number(parseInt(rowArr.join(''), 2).toString(10))
            if (ten > max) {
                max = ten
            }
            let end = rowArr.pop()
            rowArr.unshift(end)
        }
        return max
    }
    let max = arr.reduce((pre, cur) => {
        return pre + Number(rowMax(cur))
    }, 0)
    console.log(max)
}

// 太阳能面板最大面积
const tZuidamianji = () => {
    let str = '10,9,8,7,6,5,4,3,2,1'
    let max = 0n
    let strArr = str.split(',').map(item => Number(item))
    let left = 0, right = strArr.length - 1
    while (left < right) {
        let width = right - left
        let leftHeight = strArr[left]
        let rightHeight = strArr[right]
        if (leftHeight < rightHeight) {
            left++
        } else {
            right--
        }
        let minHeight = rightHeight > leftHeight ? leftHeight : rightHeight
        let area = BigInt(width) * BigInt(minHeight)
        if (area > max) {
            max = area
        }
    }
    console.log(max.toString().replace('n', ''))
}

//数组去重和排序
const suzuquchongyupaixu = () => {
    const map = {}
    let str = '1,3,3,3,2,4,4,4,5'
    let strArr = str.split(',').map(n => Number(n))
    strArr.forEach(s => {
        if (map[s]) {
            map[s]++
        } else {
            map[s] = 1
        }
    })
    let arr = [...Object.entries(map)]
    arr.sort((a, b) => {
        let [aKey, aValue] = a
        let [bKey, bValue] = b
        if (aValue < bValue) {
            return 1
        } else if (aValue === bValue) {
            return 0
        } else {
            return -1
        }
    })
    console.log(arr.map(item => item[0]).join(','))
}

// 猴子爬山
const houzipashan = (n) => {
    const innerLoop = (n) => {
        if (n === 3) {
            return 2
        } else if (n <= 2) {
            return 1
        }
        return innerLoop(n - 1) + innerLoop(n - 3)
    }
    return innerLoop(n)
}
console.log(houzipashan(50))

// 统计停车场
const tichechang = () => {
    let str = '1,0,1'
    let strArr = str.split(',')
    let count = 0, flag = false, tempCount = 0
    for (let i = 0; i < strArr.length; i++) {
        let s = strArr[i]
        if (s === '1') {
            flag = true
            tempCount++
            if (tempCount === 3) {
                count++
                tempCount = 0
                flag = false
            }
        } else {
            if (flag) {
                count++
                flag = false
                tempCount = 0
            }
        }
    }
    if (flag && tempCount > 0) {
        count++
    }
    console.log(count)
}

// 打印任务排序
const dayinrenwupaixu = (str) => {
    let stacks = str.split(',').map((r, i) => {
        return {index: i, value: Number(r)}
    })
    let execStacks = []
    while (stacks.length > 0) {
        let head = stacks.shift()
        if (stacks.some(item => {
            return item.value > head.value
        })) {
            stacks.push(head)
        } else {
            execStacks.push(head.index)
        }
    }
    console.log(execStacks.join(','))
}
// dayinrenwupaixu('8,7,8,6')

// 磁盘容量排序
const cipanrongliangpaixu = () => {
    let str = `2G4M
3M2G
1T`
    let strArr = str.split('\n')
    let sample = 'MGT'
    let G = 1024
    let T = 1024 * G
    const mkNum = (str) => {
        let tempStack = [], ans = []
        for (const s of str) {
            tempStack.push(s)
            if (sample.includes(s)) {
                ans.push(tempStack.join(''))
                tempStack = []
            }
        }
        let num = ans.reduce((pre, cur) => {
            let a = 0
            if (cur.includes('G')) {
                a = cur.replace('G', '') * G
            } else if (cur.includes('T')) {
                a = cur.replace('T', '') * T
            } else {
                a = cur.replace('M', '')
            }
            return Number(a) + pre
        }, 0)
        return {
            str, num
        }
    }
    let newArr = strArr.map(mkNum)
    newArr.sort((a, b) => {
        if (b.num > a.num) {
            return -1
        } else if (b.num === a.num) {
            return 0
        } else {
            return 1
        }
    })
    newArr.forEach(item => {
        console.log(item.str)
    })
}

// 报数游戏
const baoshuyouxi = (target) => {
    if (target > 100 || target < 0) {
        console.log('ERROR!')
        return
    }
    let arr = new Array(100).fill('1').map((r, i) => {
        return i + 1
    })
    const innerLoop = (_arr) => {
        if (_arr.length < target) {
            return _arr
        }
        // 重新进行操作
        let head = _arr.slice(target)
        let end = _arr.slice(0, target - 1)
        return innerLoop([...head, ...end])
    }
    console.log(innerLoop(arr).join(','))
    return
}
// baoshuyouxi(3)

//解压报文 难点 重要
// 栈 双栈 [m2[c2[oi2[jihyb]]]]
const jieyabaowen = () => {
    let str = '1[m2[c2[oi2[jihyb]]]]'
    let numStacks = []
    let strStacks = []
    let tempNum = 0
    let result = ''
    let numReg = /[0-9]+/
    for (const s of str) {
        if (numReg.test(s)) {
            // 是数字
            tempNum = tempNum * 10 + parseInt(s)
        } else if (s === '[') {
            // 左括号
            numStacks.push(tempNum)
            // 这时候压入的是上一个括号内的str
            strStacks.push(result)
            tempNum = 0
            result = ''
        } else if (s === ']') {
            // 取出 解压
            let num = numStacks.pop()
            let repetStr = result.repeat(num)
            result = strStacks.pop() + repetStr
        } else {
            // 字母
            result += s
        }
    }
    console.log(result)
}
// jieyabaowen()

// 判断字符串子序列
const zifuchuanzixulie = () => {
    // 找到所有的以第一个字符开头的
    // 从最后一个位置搜索
    let source = 'abcaybec'
    let target = 'fhtr'

    let indexArr = []
    for (let i = 0; i < source.length; i++) {
        if (source[i] === target[0]) {
            indexArr.push(i)
        }
    }
    const isSubString = (index) => {
        let subString = source.slice(index)
        let fast = 0, slow = 0
        while (fast < subString.length) {
            if (subString[fast] === target[slow]) {
                slow++
            }
            if (slow === target.length - 1) {
                return true
            }
            fast++
        }
        return false
    }

    let t = indexArr.length - 1
    for (let i = t; i >= 0; i--) {
        let item = indexArr[i]
        if (isSubString(item)) {
            console.log(indexArr[i])
            return
        }
    }
    console.log(-1)
    // console.log(indexArr)
}
// zifuchuanzixulie()

// 无重复字符的最大子串 滑动窗口
const zuichangzichuan = (str) => {
    let left = 0, right = 0
    let stacks = [], max = 0
    while (right < str.length) {
        let item = str[right]
        if (stacks.includes(item)) {
            left++
            right = left
            let len = stacks.length
            if (len > max) {
                max = len
            }
            stacks = []
        } else {
            right++
        }
    }
}
//字符串筛选排序
const zifuchuanxianxuanpaixu = () => {
    let str = 'AbCdeFGF'
    let k = 3
    let strArr = str.split('').map((value, index, array) => {
        return {
            code: value.charCodeAt(0),
            index,
            value
        }
    })
    strArr.sort((a, b) => {
        return a.code - b.code
    })
    if (k > str.length) {
        return strArr.pop().index
    }
    let t = strArr[k - 1]
    console.log(strArr)
    let fArr = strArr.filter(item => item.code === t.code)
    console.log(fArr)
    if (fArr.length > 1) {
        return fArr[0].index
    } else {
        return t.index
    }
}
// console.log(zifuchuanxianxuanpaixu())


// 字符串加密
const zifuchuanjiami = () => {
    const pianyiliang = (i) => {
        if (i === 2) return 4
        if (i === 1) return 2
        if (i === 0) return 1
        return pianyiliang(i - 1) + pianyiliang(i - 2) + pianyiliang(i - 3)
    }
    let str = 'abcde'
    let ans = ''
    for (let i = 0; i < str.length; i++) {
        let s = str.charAt(i)
        let v = pianyiliang(i)
        console.log('偏移量', v)
        let code = s.charCodeAt(0) + v
        ans += String.fromCharCode(code)
    }
    console.log(ans)
}
// zifuchuanjiami()


//连续字母长度 map str 二维数组
const zmcd = () => {
    let str = 'AAAAHHHBBCDHHHH'
    let k = 3
    let stacks = [], tempArr = []
    const pushin = () => {
        let obj = {s: tempArr[0], v: tempArr.join(""), len: tempArr.length}
        let i = stacks.findIndex(item => item.s === obj.s)
        if (i !== -1) {
            let t = stacks[i]
            if (obj.len > t.len) {
                stacks.splice(i, 1)
                stacks.push(obj)
            }
        } else {
            stacks.push(obj)
        }
    }
    for (const s of str) {
        if (tempArr.length === 0) {
            tempArr.push(s)
        } else if (tempArr.length > 0 && tempArr.includes(s)) {
            tempArr.push(s)
        } else if (!tempArr.includes(s)) {
            pushin()
            tempArr = []
            tempArr.push(s)
        }
    }
    if (tempArr.length > 0) {
        pushin()
    }
    stacks.sort((a, b) => {
        return b.len - a.len
    })
    console.log(stacks)
    console.log(stacks[k - 1].len)
}
// zmcd()

//求机器绘图面积
const jiqihuitu = () => {
    let N = 2, E = 4, height = 0, area = 0
    let arr = `0 1
2 -2`.split('\n').map(item => item.split(' ').map(n => Number(n)))
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i]
        let [x, offSetY] = cur
        if (i > 0) {
            let pre = arr[i - 1]
            let width = x - pre[0]
            area += width * Math.abs(height)
            height = height + offSetY
        } else {
            height = height + offSetY
        }
    }
    let width = E - arr[arr.length - 1][0]
    area += width * Math.abs(height)
    console.log(area)
}
// jiqihuitu()

// 幼儿园分班
const fenban = () => {
    let str = '1/N 2/Y 3/N 4/Y'
    //两个班级
    const strArr = str.split(' ').map(i => {
        let [num, flag] = i.split('/')
        num = Number(num)
        return {num, flag}
    })
    let fan = {1: 2, 2: 1}
    for (let i = 0; i < strArr.length; i++) {
        if (i > 0) {
            let cur = strArr[i]
            let pre = strArr[i - 1]
            let classType = pre['classType']
            if (cur['flag'] === 'Y') {
                // 这个与前面的同班
                cur['classType'] = classType
            } else {
                // 不同班分到另一个班
                cur['classType'] = fan[classType]
            }
        } else {
            // 第一个先分班到1班
            strArr[i]['classType'] = 1
        }
    }
    strArr.sort((a, b) => {
        return a.num - b.num
    })
    let cType = strArr[0].classType
    let f = strArr.filter(item => item.classType === cType)
    let s = strArr.filter(item => item.classType === fan[cType])
    console.log(f.map(item => item.num).join(' '))
    console.log(s.map(item => item.num).join(' '))
}
// fenban()


//第k个排列
const kPailie = (n, k) => {
    let arr = new Array(n).fill('').map((r, i) => i + 1)
    let ans = []
    const innerLoop = (temp, _arr) => {
        if (temp.length === n) {
            ans.push(temp.join(''))
            return
        }
        _arr.forEach((r, i) => {
            let c = [..._arr]
            c.splice(i, 1)
            innerLoop([...temp, r], c)
        })
    }
    innerLoop([], arr)
    console.log(ans[k - 1])
}

// kPailie(4,9)

// 出错的或电路
const cucuodianlu = () => {
    let str = '01000110'
    let str2 = '11011001'
    // 二进制或运算 重要
    const huo = (a, b) => {
        let ans = ''
        for (let i = 0; i < a.length; i++) {
            let ai = Number(a[i])
            let bi = Number(b[i])
            ans += ai | bi
        }
        return ans
    }
    let loop = 0
    let standard = huo(str, str2)
    let count = 0
    for (let i = 0; i < str.length; i++) {
        let pre = str[i]
        for (let j = i + 1; j < str.length; j++) {
            let cur = str[j]
            if (cur === pre) continue
            let strArr = str.split('')
            strArr[i] = cur
            strArr[j] = pre
            let nStr = strArr.join('')
            if (standard !== huo(nStr, str2)) {
                count++
            }
            loop++
        }
    }
    console.log(count, loop)
}
// cucuodianlu()

// 路灯照明问题
const ludeng = () => {
    let n = 2
    let str = '50 70 20 70'
    let strArr = str.split(' ').map(n => Number(n))
    let left = 0, right = left + 1
    let ans = 0
    while (right < strArr.length) {
        let l = strArr[left]
        let r = strArr[right]
        let differ = (l + r) - 100
        if (differ < 0) {
            ans += Math.abs(differ)
        }
        left++
        right = left + 1
    }
    console.log(ans)
}
// ludeng()

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
            // console.log(`${Sn}=${ans.join('+')}`)
        }
    }
    console.log(`Result:${X}`)
}

// ziranshu(Number.MAX_SAFE_INTEGER)

// 减半分糖果
const halfTangguo = (n) => {
    let count = 0
    const innerLoop = (n) => {
        if (n === 1) {
            return
        }
        if (n % 2 === 0) {
            // 可以分配
            n = n / 2
            count++
        } else {
            // 拿一个或者放回一个 减半后是否是偶数
            let num1 = (n - 1) / 2
            let num2 = (n + 1) / 2
            if (num1 % 2 === 0) {
                n = num1
            } else {
                n = num2
            }
            count += 2

        }
        innerLoop(n)
    }
    innerLoop(n)
    console.log(count)
}
// halfTangguo(101)

// 消消乐
const xiaoxiaole = () => {
    let str = 'mMb4235ccbc'
    let reg = /^[a-zA-Z]+$/
    if (!reg.test(str)) {
        return console.log(0)
    }
    let stacks = []
    for (const s of str) {
        if (stacks.length > 0) {
            let end = stacks.pop()
            if (end !== s) {
                stacks.push(end)
                stacks.push(s)
            }
        } else {
            stacks.push(s)
        }
    }
    console.log(stacks)
}

// 补种胡杨树
const buzhonghuyang = () => {
    let n = 10
    let nArr = new Array(n).fill('').map(n => Number(n + 1))
    let m = '2 4 7'
    let l = 1
    let count = 0
    /*
        思路 滑动窗口 保持窗口内有l个空位 找到最大窗口
        1,a2,3,a4,5,6,a7,8,9,10
    * */


    let left = 1, right = 2
    while (right <= n) {
        let sub = nArr.slice(left, right)
        let count = sub.filter(v => {
            return m.includes(v)
        }).length
        if (count > l) {
            left++
        } else {

        }
        right++
        console.log(count)
    }
}
// buzhonghuyang()

// GPU 执行最短时长
const minTime = () => {
    let task = '1 2 3 4 5'
    let n = 3
    let tasks = task.split(' ').map(n => Number(n)).sort((a, b) => b - a)
    let ans = []
    // const findMax = (m) => {
    //     for (let i = 0; i < tasks.length;i++) {
    //         let t = tasks[i]
    //         if((m + t) % n === 0) {
    //             tasks.splice(i,1)
    //             return t
    //         }
    //     }
    //     return false
    // }
    // // 两两相加 等于 n的倍数 或者自己是n的倍数
    // while (tasks.length > 0) {
    //     // 取出头部
    //     let head = tasks.shift()
    //     let compare = findMax(head)
    //     if(compare) {
    //         ans.push(head,compare)
    //     }else {
    //         ans.push(head)
    //     }
    // }
    let time = 0, left = 0
    while (tasks.length > 0) {
        let head = tasks.shift()
        let t = left + head
        if (t <= n) {
            time++
            left = 0
            continue
        }
        time += Math.floor(t / n)
        left = t % n
    }
    console.log(time)
}
// minTime()

/*
*  按身高体重排序
* */
const hwSort = () => {
    let n = 4
    let height = '90 110 90'.split(' ').map(n => Number(n))
    let weight = '45 60 45'.split(' ').map(n => Number(n))
    let memberArr = height.map((item, index) => {
        return {
            no: index + 1,
            height: item,
            weight: weight[index]
        }
    })
    memberArr.sort((a, b) => {
        let flag1 = a.height > b.height
        let flag2 = (b.height === a.height) && a.weight > b.weight
        let flag3 = (b.height === a.height) && (a.weight === b.weight)
        if (flag1 || flag2) {
            return 1
        } else if (flag3) {
            return 0
        } else {
            return -1
        }
    })
    console.log(memberArr.map(item => item.no).join(' '))
}
// hwSort()

// 流水线
const liushuixian = () => {
    let n = 3
    let tasks = "8 4 3 2 10".split(' ').map(n => Number(n)).sort((a, b) => {
        return a - b
    })
    // console.log(tasks)
    // 模拟过程
    let map = {}
    const findMin = () => {
        let min = undefined, index = null
        for (const mapKey in map) {
            let item = map[mapKey]
            if (min === undefined) {
                min = item
                index = mapKey
                continue
            }
            if (item < min) {
                index = mapKey
                min = item
            }
        }
        return index
    }
    for (let i = 0; i < tasks.length; i++) {
        let cur = tasks[i]
        if (i < n) {
            // 预先分派
            map[i] = cur
        } else {
            // 找到最小的进行分派 sum
            let j = findMin()
            map[j] += cur
        }
    }
    const findMax = () => {
        let max = undefined, target = null
        for (const mapKey in map) {
            let item = map[mapKey]
            if (max === undefined) {
                max = item
                target = item
                continue
            }
            if (item > max) {
                target = item
                max = item
            }
        }
        return target
    }
    let max = findMax()

    console.log(max)
}

liushuixian()

// 字符串比较
const strduibi = () => {
    // 滑动窗口题
    let str1 = 'xxcdefg'
    let str2 = 'cdefghi'
    let v = 5
    let left = 0, right = left + 1
    const sum = (left, right) => {
        let ans = 0
        for (let i = left; i < right; i++) {
            let diff = Math.abs(str1[i].charCodeAt(0) - str2[i].charCodeAt(0))
            ans += diff
        }
        return ans
    }
    let ans = ''
    while (right <= str1.length) {
        let subStr = str1.substring(left, right)
        if (str2.includes(subStr) && sum(left, right) <= v) {
            left++
            right = left + 1
            if (subStr.length > ans.length) {
                ans = subStr
            }
        } else {
            if (right === str1.length) {
                left++
                right = left
            }
            right++
        }
    }
    console.log(ans)
}
// strduibi()


// 字符串解压
const jieyazifuchuan = () => {
    let str = '3abb4cd'
    let numReg = /[0-9]+/
    let enReg = /[a-z]+/
    let num = 0
    let temp = ''
    let ans = ''
    const depress = () => {
        let t = temp.repeat(num)
        num = 0
        temp = ''
        ans += t
    }
    for (let i = 0; i < str.length; i++) {
        let cur = str[i]

        if (numReg.test(cur)) {
            num = num * 10 + parseInt(cur)
        } else if (enReg.test(cur)) {
            temp += cur
        }
        if (i !== str.length - 1) {
            let next = str[i + 1]
            if (enReg.test(cur) && numReg.test(next)) {
                depress()
            }
        }
        if (enReg.test(cur) && i === str.length - 1) {
            // 解压
            depress()
        }
    }
    console.log(ans)
}
// jieyazifuchuan()


//最远足迹
const zuiyuanzuji = () => {
    let str = 'ferg(0,10)a13fdsf3(3,4)f2r3rfasf(5,0)'
    let reg = /\([^)]+\)/g
    let positions = str.match(reg)
    const validate = (str) => {
        let reg = /[()]+/g
        let arr = str.replace(reg, '').split(',')
        let flag = arr.some(item => {
            return item.startsWith('0')
        })
        if (flag) {
            return !flag
        } else {
            return arr[0] * arr[0] + arr[1] * arr[1]
        }
    }
    let maxStr = '', maxNum = 0
    for (const position of positions) {
        let flag = validate(position)
        if (flag && flag > maxNum) {
            maxNum = flag
            maxStr = position
        }
    }
    console.log(maxStr)
}

// zuiyuanzuji()

// vlan资源池
const vlan = () => {
    let str = '1-5'
    let target = 2
    let strArr = str.split(',')
    const decode = (arr = []) => {
        let a = arr.reduce((pre, cur) => {
            if (cur.includes('-')) {
                let [head, end] = cur.split('-')
                head = Number(head)
                end = Number(end)
                let brr = new Array(end - head + 1).fill(0).map((r, i) => {
                    return i + head
                })
                pre = [...pre, ...brr]
            } else {
                pre.push(Number(cur))
            }
            return pre
        }, [])
        a.sort((a, b) => {
            return a - b
        })
        return a
    }
    const encode = (arr = []) => {
        let tempStack = [], ans = []
        for (let i = 0; i < arr.length; i++) {
            let cur = arr[i]
            if (i > 0) {
                let pre = arr[i - 1]
                if (cur - pre === 1) {
                    tempStack.push(cur)
                } else {
                    // 清空
                    if (tempStack.length === 1) {
                        ans.push(tempStack[0])
                    } else {
                        ans.push(`${tempStack[0]}-${tempStack[tempStack.length - 1]}`)
                    }
                    tempStack = [cur]
                }
                if (i === arr.length - 1 && tempStack.length > 0) {
                    if (tempStack.length === 1) {
                        ans.push(tempStack[0])
                    } else {
                        ans.push(`${tempStack[0]}-${tempStack[tempStack.length - 1]}`)
                    }
                }
            } else {
                tempStack.push(cur)
            }
        }
        return ans
    }
    let nArr = decode(strArr)
    if (nArr.includes(target)) {
        let index = nArr.findIndex(item => item === target)
        nArr.splice(index, 1)
    }
    return encode(nArr).join(',')
}
console.time('a')

// 真实车费
const realMoney = (num = 0) => {
    let count = 0
    for (let i = 1; i <= num; i++) {
        if (i.toString().includes('4')) {
            count++
        }
    }
    return num + count
}

// 重要 考前背一下
const realMoneyFast = (N = 0) => {
    let ans = N, temp = 0, k = 0, j = 1;
    while (N > 0) {						//	100	10			1
        if ((N % 10) > 4) {
            temp += ((N % 10) - 1) * k + j;
        } else {
            temp += (N % 10) * k;		//	0	0			1*19
        }
        k = k * 9 + j;					//	1	1*9+10=19
        j = j * 10;						//	10	100
        N = N / 10;						//	10	1
    }
    console.log(temp)
    // return ans - temp
}
// console.log(realMoney(50000))
// console.timeEnd('a')

/*
*  Sn = na1 + n(n - 1)*d / 2     2Sn = 2na1 + n(n-1)    a1 = (2Sn - n(n - 1)) / 2n
*   2Sn = 2n + n(n-1)    2Sn = n(n+1)  n(n+1) <= 2Sn
* */
const lianxu = (Sn = 0) => {
    for (let n = 1; n * (n + 1) <= 2 * Sn; n++) {
        if ((2 * Sn - n * (n - 1)) % (2 * n) === 0) {
            let a1 = (2 * Sn - n * (n - 1)) / (2 * n)
            let ans = []
            for (let i = 0; i < n; i++) {
                ans.push(a1++)
            }
            console.log(ans.join('+'))
        }
    }
}
// lianxu(10)


// 正方形的数量
/*
* 已知：正方形的两个点 (x1,y1)  (x2,y2)
则：正方形另外两个点的坐标为
x3=x1+(y1-y2)   y3= y1-(x1-x2)
x4=x2+(y1-y2)   y4= y2-(x1-x2)
或
x3=x1-(y1-y2)   y3= y1+(x1-x2)
x4=x2-(y1-y2)   y4= y2+(x1-x2)
从另一位博主的文章中学到这一计算公式
原文链接：https://blog.csdn.net/qq_40507857/article/details/84205680
通过上述的公式，只要枚举两个顶点，根据这两个顶点计算出要满足正方形需要的剩下两个顶点，然后判断该顶点是否在输入的列表中是否存在，如果都存在则方案数+1，最后所得方案数要除以4，因为一个正方形有四条边，每条边都会对这个正方形判断一次。
*
* */
const squeNum = () => {
    let N = 4
    let str = `0 0
1 2
3 1
2 -1`
    if (N < 4) return 0
    let strArr = str.split('\n').map(item => {
        let [x, y] = item.split(' ')
        x = Number(x)
        y = Number(y)
        return [x, y]
    })
    const findTarget = (target) => {
        let flag = strArr.find(item => {
            return target[0] === item[0] && target[1] === item[1]
        })
        return !!flag
    }
    let count = 0
    for (let i = 0; i < strArr.length; i++) {
        let [x1, y1] = strArr[i]
        for (let j = i + 1; j < strArr.length; j++) {
            let [x2, y2] = strArr[j]
            let x3_1 = x1 + (y1 - y2)
            let y3_1 = y1 - (x1 - x2)
            let x4_1 = x2 + (y1 - y2)
            let y4_1 = y2 - (x1 - x2)
            if (findTarget([x3_1, y3_1]) && findTarget([x4_1, y4_1])) {
                count++
            }
            let x3_2 = x1 - (y1 - y2)
            let y3_2 = y1 + (x1 - x2)
            let x4_2 = x2 - (y1 - y2)
            let y4_2 = y2 + (x1 - x2)

            if (findTarget([x3_2, y3_2]) && findTarget([x4_2, y4_2])) {
                count++
            }
        }
    }
    // 枚举每两个顶点 求出另外两个点 假如剩下的点里边有,那么就是一个正方形
    console.log(count)
}
// squeNum()


// 求最多可以派出多少支团队

const maxtuandui = () => {
    let max = 8
    let count = 0
    let str = '1 1 9'
    let strArr = str.split(' ').map(n => Number(n)).sort((a, b) => b - a)
    console.log(strArr)
    // 最符合 假如当前数小于 目标数 寻找另一个数的差值最小
    const mostConform = (target = 0) => {
        for (let i = strArr.length - 1; i >= 0; i--) {
            let r = strArr[i]
            let sum = target + r
            if (sum >= max) {
                count++
                strArr.splice(i, 1)
                return true
            }
        }
    }
    // 贪心算法
    while (strArr.length > 0) {
        let head = strArr.shift()
        if (head >= max) {
            count++
        } else {
            mostConform(head)
        }
    }
    console.log(count)
}
// maxtuandui()


// 数组拼接
const concatArr = () => {
    let n = 3
    let str = `2,5,6,7,9,5,7
1,7,4,3,4
1,5,6,7,8,90,2`
    let strArr = str.split('\n').map((r) => {
        return r.split(',')
    })
    let ans = []
    while (strArr.length > 0) {
        let head = strArr.shift()
        if (head.length >= n) {
            let spliceArr = head.splice(0, n)
            ans = ans.concat(spliceArr)
        } else if (head.length > 0) {
            ans = ans.concat([...head])
            head = []
        }
        if (head.length > 0) {
            strArr.push(head)
        }
    }
    console.log(ans)
}
// concatArr()

// 路灯照明问题
const ludeng2 = () => {
    let n = 8
    let str = '10 10 10 250 10 10 10 10'
    let strArr = str.split(' ')
    // 默认是黑暗的
    let lights = new Array((n - 1) * 100).fill('0')
    const light = () => {
        for (let i = 0; i < strArr.length; i++) {
            let item = strArr[i]
            for (let j = 0; j < Number(item); j++) {
                let index = i * 100 + j
                if (index >= 0 && index <= (n - 1) * 100 - 1) {
                    // 点灯
                    lights[index] = 1
                }
            }
        }
    }
    light()
    strArr.reverse()
    lights.reverse()
    light()
    console.log(lights.join('').replace(/1/g, '').length)
}
// ludeng2()

// 素数之积
const susuziji = (n = 0) => {
    const isZhi = (m) => {
        if (m <= 3) {
            return m > 1
        }
        for (let i = 2; i <= Math.sqrt(m); i++) {
            if (m % i === 0) {
                // 可以被整除
                return false
            }
        }
        return true
    }
    let a, b
    for (let i = 2; i <= Math.sqrt(n);) {
        if (n % i === 0) {
            if (isZhi(i)) {
                let other = n / i
                if (isZhi(other)) {
                    a = i
                    b = other
                }
            }
        }
        if (i === 2) {
            i++
        } else {
            i += 2
        }
    }
    console.log(a, b)
}
// susuziji(15)

// 最大公约数
const gcd = (a, b) => {
    if (b === 0) {
        return a
    }
    return gcd(b, a % b)
}

// 多个数的最大公约数
const ngcd = (arr = []) => {
    let [a, b] = arr.splice(0, 2)
    let g = gcd(a, b)
    arr.forEach(item => {
        g = gcd(g, item)
    })
    return g
}

// 最小公倍数
const lcm = (a, b) => {
    return (a * b) / gcd(a, b)
}

// 多个最小公倍数
const nlcm = (arr) => {
    const [a, b] = arr.splice(0, 2)
    let l = lcm(a, b)
    for (const ar of arr) {
        l = lcm(ar, l)
    }
    return l
}


const jiyabaowen = (str = '3[m2[c]]') => {
    let numStacks = []
    let strStacks = []
    let ans = '', num = 0
    let numReg = /[0-9]+/
    for (const s of str) {
        if (numReg.test(s)) {
            // 是数字
            num = num * 10 + parseInt(s)
        } else if (s === '[') {
            numStacks.push(num)
            strStacks.push(ans)
            num = 0
            ans = ''
        } else if (s === ']') {
            // 解压
            let num = numStacks.pop()
            let repeatStr = ans.repeat(num)
            ans = strStacks.pop() + repeatStr
        } else {
            ans += s
        }
    }
    return ans
}

// console.log(jiyabaowen('3[k]2[mn]'))


/**
 * 01背包问题 体积 价值 求最大体积下的最大价值
 * @param {Array} weights 物体体积数组
 * @param {Array} values 物品价值数组
 * @param {Number} W 最大体积数
 */
function knapsack(weights, values, W) {
    const n = weights.length;
    const f = new Array(W + 1).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = W; j >= weights[i]; j--) {
            f[j] = Math.max(f[j], f[j - weights[i]] + values[i]);
        }
    }
    return f[W];
}

/*
* 无重复字符的最大子串
* */
const lengthOfLongestSubstring = function (str) {
    if (str.length <= 1) {
        return str.length
    }
    let left = 0;let right = 1;let max = 0;let temp
    while (right < str.length) {
        temp = str.slice(left, right)
        if (temp.includes(str[right])) {
            left++
            continue
        } else {
            right++
        }
        max = Math.max(right - left, max)
    }
    return max
};

//以矩形左上角的点为基点，x为横坐标，y为纵坐标，w为矩形的宽度，h为矩形的高度
let recA = {x: 1, y: 6, w: 4, h: 4}
function getRect(recA, recB) {	//求出两个矩形相交形成的矩形
    let rectLeft = null,rectRight = null,rectTop = null,rectBottom = null;
    if (recA.x < recB.x) {
        rectLeft = recA
        rectRight = recB
    } else {
        rectRight = recA
        rectLeft = recB
    }
    if (rectLeft.x + rectLeft.w <= rectRight.x) {
        return {x: -1, y: -1, w: -1, h: -1}
    }
    if (recA.y < recB.y) {
        rectTop = recB
        rectBottom = recA
    } else {
        rectTop = recA
        rectBottom = recB
    }
    if (rectBottom.y + rectBottom.h <= rectTop.x) {
        return {x: -1, y: -1, w: -1, h: -1}
    }
    return { // 返回相交的矩形 两两比较
        x: rectRight.x,
        y: rectBottom.y,
        w: (rectLeft.x + rectLeft.w) < (rectRight.x + rectRight.w) ? (rectLeft.x + rectLeft.w - rectRight.x) : (rectRight.x + rectRight.w - rectRight.x),
        h: (rectBottom.y + rectBottom.h) < (rectTop.y + rectTop.h) ? (rectBottom.y + rectBottom.h - rectTop.y) : (rectTop.y + rectTop.h - rectTop.y)
    }
}
let str = `1 6 4 4
3 5 3 4
0 3 7 3`
let strArr = str.split('\n').map(item => {
    let [x,y,w,h] = item.split(' ').map(n => Number(n))
    return {x,y,w,h}
})
// let a = getRect(strArr[0],strArr[1])
// let b = getRect(strArr[2],a)
// console.log(b)
/**,爬楼梯 猴子爬山 1或2
 * @param {number} n
 * @return {number}
 */
const climbStairs = function(n) {
    const sqrt_5 = Math.sqrt(5);
    const fib_n = Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2,n + 1);
    return Math.round(fib_n / sqrt_5);
};
console.log(climbStairs(50))
