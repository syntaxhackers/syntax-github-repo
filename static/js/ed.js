function resetEd()
{
	var text = document.getElementById("edtext");
	text.value = "";
}

function showEd()
{
	document.querySelector(".ed").classList.remove("hidden");
}

function hideEd()
{
	document.querySelector(".ed").classList.add("hidden");
}

function ed()
{
	resetEd();
	showEd();
}

function edc()
{
	var text = document.getElementById("edtext").value;
	var mode = getCheckedRadioButton("edmode");
	var result = "Result: ";

	console.log("ED Text: " + text)
	console.log("ED Mode: " + mode)

	if (mode == "e")
	{
		console.log("ED: Getting Encrypted!")
		result += getEDEncrypted(text);
	}
	else if (mode == "d")
	{
		console.log("ED: Getting Decrypted!")
		result += getEDDecrypted(text);
	}

	console.log("ED Result: " + result)

	document.getElementById("edresult").innerHTML = result;
}

thethethec = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
thethetheC = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z']
thethethev = ['a', 'e', 'i', 'o', 'u', 'y']
thethetheV = ['A', 'E', 'I', 'O', 'U', 'Y']

function getEDEncrypted(text)
{
	var c = thethethec;
	var C = thethetheC;
	var v = thethethev;
	var V = thethetheV;

	var ns = "";

	for (var i = 0; i < text.length; i ++)
	{
		console.log("ED: found char")
		var char = text[i];

		if (c.includes(char))
		{
			var n = c.indexOf(char);
			n -= 3;
			if (n < 0)
				n += c.length;
			ns += c[n];
		}
		else if (C.includes(char))
		{
			n = C.indexOf(char);
			n -= 3;
			if (n < 0)
				n += C.length;
			ns += C[n];
		}
		else if (v.includes(char))
		{	
			n = v.indexOf(char);
			n += 3;
			if (n >= v.length)
				n -= v.length;
			ns += v[n];
		}
		else if (V.includes(char))
		{
			n = V.indexOf(char);
			n += 3;
			if (n >= V.length)
				n -= V.length;
			ns += V[n];
		}
		else
		{
			ns += char
		}
	}

	console.log("ED ns:", ns)

	return ns;
}

function getEDDecrypted(text)
{
	var c = thethethec;
	var C = thethetheC;
	var v = thethethev;
	var V = thethetheV;

	var ns = "";

	for (var i = 0; i < text.length; i ++)
	{
		console.log("ED: found char")
		var char = text[i];

		if (c.includes(char))
		{
			var n = c.indexOf(char);
			n += 3;
			if (n >= c.length)
				n -= c.length;
			console.log("decrypting it's in c so we've got that index of " + n + " after adding 3 and subtracting c.length!")
			ns += c[n];
		}
		else if (C.includes(char))
		{
			n = C.indexOf(char);
			n += 3;
			if (n >= C.length)
				n -= C.length;
			ns += C[n];
		}
		else if (v.includes(char))
		{	
			n = v.indexOf(char);
			n -= 3;
			if (n < 0)
				n += v.length;
			ns += v[n];
		}
		else if (V.includes(char))
		{
			n = V.indexOf(char);
			n -= 3;
			if (n < 0)
				n += V.length;
			ns += V[n];
		}
		else
		{
			ns += char
		}
	}

	console.log("ED ns:", ns)

	return ns;
}

function getCheckedRadioButton(name)
{
	try
	{
		return document.querySelector('input[name="' + name + '"]:checked').value;
	}
	catch(e)
	{
		return null;
	}
}


/* switching to google */