
// Complete the checkMagazine function below.
function checkMagazine(magazine, note) {
    let obj = {}
    let obj_magazine = {}
    for(let item of magazine) {
        if(!obj_magazine[item]) {
            obj_magazine[item] = 1
        } else {
            obj_magazine[item] ++
        }
    }

    for(let item of note) {
        if(obj_magazine[item]) {
            obj_magazine[item] --
            if(obj_magazine[item]<0) {
                console.log(false)
                return
            }
        } else {
            console.log(false)
            return
        }
    }
    console.log(true)
    return true
}
let a = 'give me one grand today night'.split(' ')
let b = 'give one grand today'.split(' ')

checkMagazine(a, b)
