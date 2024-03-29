import fitz  # PyMuPDF

def convert_pdfs_to_images(pdf_filenames, folder_path):
    for pdf_filename in pdf_filenames:
        # PDF 파일 경로
        pdf_path = f"{folder_path}/{pdf_filename}"
        # PDF 문서 열기
        doc = fitz.open(pdf_path)

        front_count, back_count = 1, 1

        for page_number in range(len(doc)):
            page = doc.load_page(page_number)  # 페이지 불러오기
            pix = page.get_pixmap(matrix=fitz.Matrix(150 / 72, 150 / 72))

            # 파일명 준비 (확장자 제외)
            base_filename = pdf_filename.rsplit('.', 1)[0]

            # 홀수 번째 페이지 (fitz는 0부터 페이지 번호를 시작하므로 실제로는 짝수 페이지임)
            if (page_number + 1) % 2 == 0:
                image_filename = f"{folder_path}/{base_filename}_back_{back_count}.jpg"
                back_count += 1
            else:
                image_filename = f"{folder_path}/{base_filename}_front_{front_count}.jpg"
                front_count += 1
            
            pix.save(image_filename)  # 이미지 파일로 저장

        doc.close()  # PDF 문서 닫기

# 사용 예시
pdf_filenames = ['value_self.pdf','value_we.pdf','value_community.pdf']  # 변환할 PDF 파일 이름 리스트
folder_path = '.'  # PDF 파일과 이미지를 저장할 폴더 경로
convert_pdfs_to_images(pdf_filenames, folder_path)
