<!DOCTYPE html>
<html>
<head>
<title>Ure Museum Database: test widget</title>
<meta name="layout" content="ure/main" />     
</head>
<body>
<%
def uris  =  [
'2010.98.0140.jpg',
'2005.99.0116.jpg',
'2008.99.0339.jpg',
'2005.99.0016.jpg',
'2008.99.0331.jpg',
'2002.98.0936.jpg',
'2007.99.0096.jpg',
'2001.99.0004.jpg',
'2010.98.0019.jpg',
'2007.03.1302.jpg',
'2010.99.0140.jpg',
'2002.97.0310.jpg',
 '2001.99.0018.jpg',
 '2003.97.0289.jpg',
'2003.97.0290.jpg',
'2003.97.0291.jpg',
'2003.97.0292.jpg',
'2003.97.0293.jpg',
'2003.97.0308.jpg',
'2003.97.0309.jpg',
'2003.97.0310.jpg',
'2003.97.0311.jpg',
'2003.97.0313.jpg',
'2003.97.0314.jpg',
'2003.97.0315.jpg',
'2003.97.0325.jpg',
'2003.97.0326.jpg',
'2003.97.0327.jpg',
'2003.97.0355.jpg',
'2003.97.0356.jpg',
'2003.97.0357.jpg',
'2003.97.0358.jpg',
'2003.97.0386.jpg',
'2003.97.0387.jpg',
'2003.97.0388.jpg',
'2003.97.0389.jpg',
'2003.97.0401.jpg',
'2004.99.0229.jpg',
'2004.99.0230.jpg',
'2004.99.0231.jpg',
'2004.99.0232.jpg',
'2004.99.0233.jpg',
'2004.99.0234.jpg',
'2004.99.0235.jpg',
'2004.99.0236.jpg',
'2005.99.0180.jpg',
'2007.03.0420.jpg',
'2007.03.0421.jpg',
'2007.03.0422.jpg',
'2007.03.0423.jpg',
'2007.03.0424.jpg',
'2007.03.0425.jpg',
'2007.12.0006.jpg',
'2007.12.0007.jpg',
'2007.30.0054.jpg',
'2007.30.0055.jpg',
'2007.03.0479.jpg',
'2009.05.0004.jpg',
'2005.02.0107.jpg',
'2005.02.0108.jpg',
'2005.02.0109.jpg',
'2003.37.0009.jpg',
'2003.37.0098.jpg',
'2002.97.0083.JPG',
'2003.02.0075.jpg',
'2003.97.0674.jpg',
'2003.97.0675.jpg',
'2003.97.0676.jpg',
'2003.97.0677.jpg',
'2003.05.0003.jpg',
'2003.05.0088.jpg',
'2003.05.0090.jpg',
'2003.92.0185.jpg',
'2003.92.0186.jpg',
'2003.92.0232.jpg',
    
'2003.98.0287.jpg',
'2003.98.0288.jpg',
'2003.98.0289.jpg',
'2003.98.0290.jpg',
'2005.90.0005.jpg',
'2008.99.0201.jpg',
'2008.99.0202.jpg',
'2008.99.0203.jpg',
'2008.99.0204.jpg',
'2008.99.0205.jpg',
'2008.99.0206.jpg',
'2008.99.0207.jpg',
'2008.99.0208.jpg',
'2003.92.0054.jpg',
'2003.92.0055.jpg',
'2003.92.0056.jpg',
'2003.92.0057.jpg',
'2003.92.0058.jpg',
'2003.92.0059.jpg',
'2003.92.0060.jpg',
'2010.99.0064.jpg',
'2010.99.0065.jpg',
'2010.99.0066.jpg',
'2010.99.0067.jpg',
'2010.99.0068.jpg'

]
     %>
 <style>
 #testgridw {
 font-size: 8px;
 }
 #testgridw .image-infobox {
	background: black;
	color: white;
	opacity: 0.6;
	padding-left: 3px;
}

#testgridw .image-infobox div {
	line-height: normal;
	padding-bottom: 10px;
}

#testgridw .image-infobox  .short_title {
	font-style: italic;
	font-weight: bold;
}

#testgridw .image-infobox .desc {
	line-height: 10px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display:none;
}
 </style>    
     
     
<ure:gridWidgetForImageUris gridid="testgridw" klass="testwidget" uris="${uris}" displayInfobox="true" height="100px" width="100px">
</ure:gridWidgetForImageUris>



</body>
</html>