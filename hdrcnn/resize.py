import cv2
import os 
import time

read_path = './data'
write_path = './resized'
scale_factor = 0.5 
start = time.time()

for root, dirs, files in os.walk(read_path):
	for file in files:
		img = cv2.imread(os.path.join(root, file), cv2.IMREAD_UNCHANGED)
		print('Original Dimensions {}: {}'.format(file, img.shape))
		width = int(img.shape[1] * scale_factor)
		height = int(img.shape[0] * scale_factor)
		dim = (width, height)
		resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
		print('Resized Dimensions {}: {}'.format(file,resized.shape))
		cv2.imwrite(os.path.join(write_path, file), resized)

print('Resize-ovano za {} sekundi'.format(time.time() - start))
