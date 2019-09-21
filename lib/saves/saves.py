import pymongo

client = pymongo.MongoClient()
db = client['outer_space']

init_meta = db.meta.find_one({})
if init_meta is None:
    db.meta.insert_one({'image_counter': 1})

def save_image(username, name):
    counter = db.meta.find_one({})['image_counter']
    db.images.insert_one({
        'username': username,
        'name': name,
        'index': counter
        })
    db.meta.update_one({},{'$inc': {'image_counter': counter}})
    return counter

def get_all_images():
    cursor = db.images.find({})
    ret = []
    for image in cursor:
        ret.append(image)
    return ret
