from PIL import Image
import os

def rotate_images_in_folder(folder_path, keyword1, keyword2):
    # 폴더 내의 모든 파일 및 디렉토리 목록을 가져옵니다.
    for filename in os.listdir(folder_path):
        # 파일 이름에 두 키워드가 모두 포함되어 있는지 확인합니다.
        if keyword1 in filename and keyword2 in filename:
            # 이미지 파일의 전체 경로를 구성합니다.
            file_path = os.path.join(folder_path, filename)
            
            try:
                # 이미지를 로드합니다.
                with Image.open(file_path) as img:
                    # 이미지를 45도 회전합니다. 여기서 배경색을 흰색으로 설정합니다.
                    rotated_img = img.rotate(-45, expand=True, fillcolor='#FFFFFF')
                    # 회전된 이미지를 같은 이름으로 저장합니다.
                    rotated_img.save(file_path)
                    print(f'Rotated: {filename}')
            except Exception as e:
                # 이미지 로드 또는 처리 중 발생한 오류를 출력합니다.
                print(f'Error processing {filename}: {e}')

# 사용 예:
folder_path = 'path/to/your/folder' # 이미지가 있는 폴더 경로
keyword1 = 'value' # 첫 번째 키워드
keyword2 = '_' # 두 번째 키워드
rotate_images_in_folder('.', keyword1, keyword2)
