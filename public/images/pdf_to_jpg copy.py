import fitz  # PyMuPDF

def extract_images_from_pdf_custom(pdf_path, zoom=2):
    # PDF 파일 열기
    doc = fitz.open(pdf_path)
    
    # 변환 행렬 생성 (기본 2배 확대)
    mat = fitz.Matrix(zoom, zoom)
    
    # PDF의 각 페이지를 순회
    for page_number in range(len(doc)):
        if 0 <= page_number + 1 <= 9:  # 1부터 10까지는 'value_self_front'
            page = doc.load_page(page_number)
            pix = page.get_pixmap(matrix=mat)
            image_filename = f"value_community_front_{page_number + 1}.jpg"
            pix.save(image_filename)
        elif 11 <= page_number + 1 <= 20:  # 11부터 20까지는 'value_self_back'
            page = doc.load_page(page_number)
            pix = page.get_pixmap(matrix=mat)
            image_filename = f"value_community_back_{page_number - 9}.jpg"
            pix.save(image_filename)

# 함수 사용 예
extract_images_from_pdf_custom("value_community.pdf")
