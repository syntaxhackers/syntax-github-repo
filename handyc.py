try:
	input = raw_input
except:
	pass

c = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
C = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z']
v = ['a', 'e', 'i', 'o', 'u', 'y']
V = ['A', 'E', 'I', 'O', 'U', 'Y']

a = input("What? ")
print "so encrypt or decrypt (e/d)"
b = input("choice: ")

new = ""

if b == "e":
	for char in a:
		if char in c:
			n = c.index(char)
			n -= 3
			if n < 0:
				n += len(c)
			new += c[n]
		elif char in C:
			n = C.index(char)
			n -= 3
			if n < 0:
				n += len(C)
			new += C[n]
		elif char in v:
			n = v.index(char)
			n += 3
			if n >= len(v):
				n -= len(v)
			new += v[n]
		elif char in V:
			n = V.index(char)
			n += 3
			if n >= len(V):
				n -= len(V)
			new += V[n]
		else:
			new += char

	print "right here is your result: " + new

elif b == "d":
	for char in a:
		if char in c:
			n = c.index(char)
			n += 3
			if n >= len(c):
				n -= len(c)
			new += c[n]
		elif char in C:
			n = C.index(char)
			n += 3
			if n >= len(c):
				n -= len(C)
			new += C[n]
		elif char in v:
			n = v.index(char)
			n -= 3
			if n < 0:
				n += len(v)
			new += v[n]
		elif char in V:
			n = V.index(char)
			n -= 3
			if n < 0:
				n += len(V)
			new += V[n]
		else:
			new += char

	print "right here is your result: " + new

else:
	print 'error, you did not choose \'e or \'d!'