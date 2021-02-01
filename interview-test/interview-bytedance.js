function FindLastKNode(head, k) {
    let current = head
    let fast = head
    let slow = head
    let index = 0
    if(!current)
        return null
    while(fast) {
        index ++
        fast = fast.next
        if(index > k) {
            slow = slow.next
        }
    }
    return slow
}

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
let a = new ListNode(1, null)
let b = new ListNode(2, null)
let c = new ListNode(3, null)
let d = new ListNode(4, null)
let e = new ListNode(5, null)
a.next = b
b.next = c
c.next = d
d.next = e
let matched = FindLastKNode(a, 2)
console.log(matched)
