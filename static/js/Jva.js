function jvaObject()
{

}

jvaObject.prototype.capitalizeCase = function(str)
{
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

jvaObject.prototype.equalsIgnoreCase = function(foo, bar)
{
	try
	{
		return foo.toLowerCase() == bar.toLowerCase();
	}
	catch(e)
	{
		return false;
	}
}

Jva = new jvaObject();