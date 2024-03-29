import fitz  # PyMuPDF

# PDF 파일 경로 설정
file_to_read = './그림책.pdf'

# PDF 문서 열기
doc = fitz.open(file_to_read)

# 각 페이지를 순회하면서 이미지 추출 및 저장
for page_number in range(len(doc)):
    page = doc.load_page(page_number)  # 페이지 불러오기
    pix = page.get_pixmap(matrix=fitz.Matrix(150 / 72, 150 / 72))  # 해상도 조정하여 고화질 이미지 생성

    # 홀수 번째 페이지 (fitz는 0부터 페이지 번호를 시작하므로, 실제 페이지 번호와 맞추기 위해 +1을 함)
    if (page_number + 1) % 2 != 0:
        image_name = f'book_back_{(page_number + 2) // 2}.jpg'
    # 짝수 번째 페이지
    else:
        image_name = f'book_front_{(page_number + 1) // 2}.jpg'
    
    pix.save(image_name)  # 이미지 파일로 저장

doc.close()  # PDF 문서 닫기
