import os
import shutil

# Define the source and destination paths
source_folder = os.getcwd()  # Current folder
destination_folder = r"C:\Users\Julian\Desktop\1.19.4\plugins\EpicSpells\scripts\auto generated"

# Iterate through all files recursively in the source folder
for root, dirs, files in os.walk(source_folder):
    for file in files:
        if file.endswith(".js"):
            file_path = os.path.join(root, file)

            if file.startswith("jdk8-types"):
                # move it to C:\Users\Julian\Desktop\EpicSpells\ts\j2ts
                destination_path = os.path.join(r"C:/Users/Julian/Desktop/1.19.4/plugins/EpicSpells/scripts/j2ts/", file)
                shutil.move(file_path, destination_path)
                continue

            # Read the content of the file
            with open(file_path, "r") as f:
                lines = f.readlines()

            # Remove the first 2 lines
            modified_lines = lines[2:]

            # Replace the desired text
            modified_content = []
            for line in modified_lines:
                if line.startswith("var jdk8_types_1"):
                    modified_content.append(
                        'var jdk8_types_1 = require("C:/Users/Julian/Desktop/1.19.4/plugins/EpicSpells/scripts/j2ts/jdk8-types");\n')
                else:
                    modified_content.append(line)

            # Write the modified content back to the file
            with open(file_path, "w") as f:
                f.writelines(modified_content)

            # Move the file to the destination folder
            destination_path = os.path.join(destination_folder, file)
            shutil.move(file_path, destination_path)

print("Files processed and moved successfully.")
