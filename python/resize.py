import cv2
import os

path = './images/hdr/'
resizePath = './images/hdr_resized/'

scale_percent = 0.5

for root, dirs, files in os.walk(path):
    for file in files:
        img = cv2.imread(os.path.join(root, file), cv2.IMREAD_UNCHANGED)

        print('Original Dimensions {}: {}'.format(file, img.shape))

        width = int(img.shape[1] * scale_percent)
        height = int(img.shape[0] * scale_percent)
        dim = (width, height)
        # resize image
        resized = cv2.resize(img, dim, interpolation=cv2.INTER_AREA)
        print(os.path.join(resizePath, file))
        cv2.imwrite(os.path.join(resizePath, file), resized)
