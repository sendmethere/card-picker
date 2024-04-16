import os

def rename_files_in_directory(directory_path):
    """
    Renames files in the specified directory based on the presence of 'value' and 'back' or 'front' in the file names.
    """
    # List all files in the directory
    files = os.listdir(directory_path)
    
    # Prepare counters for file naming
    back_counter = 1
    front_counter = 1

    # Loop through each file in the directory
    for file in files:
        # Construct the full path of the file
        full_file_path = os.path.join(directory_path, file)

        # Check if the file contains 'value' and 'back'
        if 'value' in file and 'back' in file:
            # Construct new file name
            new_file_name = f"value_back_{back_counter}.jpg"
            new_file_path = os.path.join(directory_path, new_file_name)
            # Rename the file
            os.rename(full_file_path, new_file_path)
            # Increment the counter
            back_counter += 1

        # Check if the file contains 'value' and 'front'
        elif 'value' in file and 'front' in file:
            # Construct new file name
            new_file_name = f"value_front_{front_counter}.jpg"
            new_file_path = os.path.join(directory_path, new_file_name)
            # Rename the file
            os.rename(full_file_path, new_file_path)
            # Increment the counter
            front_counter += 1

# This function call should be uncommented and directory path should be provided when ready to use
# rename_files_in_directory("/path/to/your/directory")

import os

def replace_spaces_in_filenames(directory_path):
    """
    Replaces spaces in filenames that contain the keyword 'book' with underscores.
    """
    # List all files in the directory
    files = os.listdir(directory_path)

    # Loop through each file in the directory
    for file in files:
        # Check if 'book' is in the filename
        if 'book' in file:
            # Replace spaces with underscores
            new_file_name = file.replace(' ', '_')
            # Construct the full path of the original and new file
            old_file_path = os.path.join(directory_path, file)
            new_file_path = os.path.join(directory_path, new_file_name)
            # Rename the file
            os.rename(old_file_path, new_file_path)

# This function call should be uncommented and directory path should be provided when ready to use
# replace_spaces_in_filenames("/path/to/your/directory")


import fitz  # PyMuPDF

def extract_pages_as_images():
    """
    Extracts pages from '그림책.pdf' in the current directory, saving odd-numbered pages as 'picture_book_back_X.jpg'
    and even-numbered pages as 'picture_book_front_X.jpg' with high quality.
    """
    # Open the PDF file
    doc = fitz.open("그림책.pdf")

    # Loop through each page in the document
    for page_number in range(doc.page_count):
        # Access the page
        page = doc.load_page(page_number)
        # Render the page to an image (pix) object
        pix = page.get_pixmap(matrix=fitz.Matrix(300 / 72, 300 / 72))  # High quality resolution (300 DPI)

        # Check if the page number is odd or even and save accordingly
        if (page_number + 1) % 2 != 0:  # Odd page number
            filename = f"picture_book_back_{(page_number // 2) + 1}.jpg"
        else:  # Even page number
            filename = f"picture_book_front_{(page_number // 2) + 1}.jpg"

        # Save the image
        pix.save(filename)

    # Close the document
    doc.close()

# This function call should be uncommented and used when ready to execute
extract_pages_as_images()
