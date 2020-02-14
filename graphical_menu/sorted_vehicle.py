
def sorted_vehicle(vehicles, categ):
    sort =[]

    for veh in vehicles:
        if veh.category == categ:
            sort.append(veh)
        else:
            pass
    
    return sort

