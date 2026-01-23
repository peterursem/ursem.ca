#!/bin/bash

# Set the directory to the folder containing your images
DIRECTORY="."

# Navigate to the specified directory
cd "$DIRECTORY" || { echo "Directory not found!"; exit 1; }

# Create a temporary file to hold the sorted filenames
temp_file=$(mktemp)

# Find all image files and sort them by creation date
find . -type f \( -iname "*.webp" \) \
    -exec stat -f "%B %N" {} \; | sort -n | awk '{print $2}' > "$temp_file"

# Initialize a counter
counter=0

# Read each file from the temporary file and rename it
while IFS= read -r file; do
    # Get the file extension
    extension="webp"  #"${file##*.}"
    # Create the new filename
    new_name=$(printf "%02d.%s" "$counter" "$extension")
    # Rename the file
    mv "$file" "$new_name"
    # Increment the counter
    ((counter++))
done < "$temp_file"

# Remove the temporary file
rm "$temp_file"

echo "Renaming completed!"

