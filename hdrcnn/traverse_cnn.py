import os
from skimage.io import imread
import subprocess

path = './resized/'
to_execute = 'hdrcnn_predict.py'
weights = 'hdrcnn_params.npz'

#f = open('not_included.txt', 'r')
#content = f.read()

#files = [ file for file in content.split('\n') if file != '']

#print('\n\n', files,len(files))

#f.close()


for root, dirs, files in os.walk(path):
	for file in files:
		img = imread(os.path.join(root, file))
		print('{}: \n\twidth:{} => {}\n\theight:{} => {}'.format(file, img.shape[1], img.shape[0], img.shape[1] // 2, img.shape[0] // 2))
	        # python hdrcnn_predict.py --params hdrcnn_params.npz --im_dir data/img_001.png --width 1024 --height 768
		print('python "{}" --params {} --im_dir "data/{}" --out_dir "out/{}" --width {} --height {}'.format(
	            __file__.replace('traverse_cnn.py', to_execute), weights, file, file.replace('.jpg', '').replace('.png', ''), img.shape[1], img.shape[0]))
		os.system('python "{}" --params {} --im_dir "data/{}" --out_dir "out/{}" --width {} --height {}'.format(
	            __file__.replace('traverse_cnn.py', to_execute), weights, file, file.replace('.jpg', '').replace('.png', ''), img.shape[1], img.shape[0]))
	#        break

