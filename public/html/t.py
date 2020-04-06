l = [1, 2, 3, 4, 5, 6, 7]

def sum(a):
    return 0 if not len(a) else a[0] + sum(a[1:])

print(sum(l))