import os
from skimage.io import imread
import subprocess

path = './images/jpg/'
to_execute = 'temp.py'  # hdrcnn_predict.py

for root, dirs, files in os.walk(path):
    for file in files:
        img = imread(os.path.join(root, file))
        print('{}: \n\twidth:{} => {}\n\theight:{} => {}'.format(
            file, img.shape[1], img.shape[0], img.shape[1] // 2, img.shape[0] // 2))
        # python hdrcnn_predict.py --params hdrcnn_params.npz --im_dir data/img_001.png --width 1024 --height 768
        print('python "{}" --params hdrcnn_params.npz --im_dir data/{} --width {} --height {}'.format(
            __file__.replace('traverse_cnn.py', to_execute), file, img.shape[1] // 2, img.shape[0] // 2))
        os.system('python "{}"'.format(
            __file__.replace('traverse_cnn.py', to_execute)))
