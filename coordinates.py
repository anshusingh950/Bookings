from opencage.geocoder import OpenCageGeocode

key = '92028f06dcfd40e0b4ca8235964564d7'
geocoder = OpenCageGeocode(key)

def coord(query):

# no need to URI encode query, module does that for you
    results = geocoder.geocode(query)

    return [results[0]['geometry']['lat'],results[0]['geometry']['lng']]
