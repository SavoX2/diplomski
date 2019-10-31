#import subprocess
#subprocess.check_output(['ls','-l']) #all that is technically needed...
#print(subprocess.check_output(['ls','-l']))

import os 

f = open('not_included.txt', 'w')

included = []

for root, dirs, files in os.walk('./out/'):
	for dir in dirs:
		included.append(dir)

#print(included, len(included))

all_ = []
all_w_ext = []

for root, dirs, files in os.walk('./data/'):
	for file in files:
		all_.append(file.replace('.jpg', '').replace('.png', ''))
		all_w_ext.append(file)
#print(all_, len(all_))

not_included = [ name for name in all_ if name not in included ]

print(not_included, len(not_included))

to_write = []

for n_i in not_included:
	for a_w_e in all_w_ext:
		if a_w_e.replace('.jpg', '').replace('.png', '') == n_i:
			to_write.append(a_w_e)
			break

for file in to_write:
	f.write(file + '\n')

f.close()

f = open('not_included.txt', 'r')
content = f.read()

files = [ file for file in content.split('\n') if file != '']

print('\n\n', files,len(files))

f.close()
	
