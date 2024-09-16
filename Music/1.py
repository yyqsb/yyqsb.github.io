import os
import json

def generate_file_list(directory):
    # 获取目录下的文件列表
    try:
        files = os.listdir(directory)
    except FileNotFoundError:
        print(f"Error: The directory '{directory}' does not exist.")
        return

    # 过滤出文件列表（假设只处理 MP3 文件）
    file_list = [
        {
            "name": file,
            "type": "file",
            "path": os.path.join(directory, file)
        }
        for file in files
        if os.path.isfile(os.path.join(directory, file)) and file.endswith('.mp3')
    ]

    return file_list

def save_to_json(file_list, output_file):
    # 将数据保存为 JSON 文件
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(file_list, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    # 设置目录和输出文件路径
    directory = '.'  # 当前目录
    output_file = 'file_list.json'

    # 生成文件列表
    file_list = generate_file_list(directory)
    if file_list:
        # 保存到 JSON 文件
        save_to_json(file_list, output_file)
        print(f"File list saved to '{output_file}'.")
