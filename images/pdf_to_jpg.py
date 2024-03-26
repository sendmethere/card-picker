import fitz  # PyMuPDF

def extract_high_quality_images_from_pdf(pdf_path, zoom=2):
    # PDF 파일 열기
    doc = fitz.open(pdf_path)
    
    # 변환 행렬 생성 (기본 2배 확대)
    mat = fitz.Matrix(zoom, zoom)
    
    # PDF의 각 페이지를 순회
    for page_number in range(len(doc)):
        page = doc.load_page(page_number)  # 페이지 객체 로드
        pix = page.get_pixmap(matrix=mat)  # 페이지를 확대된 이미지로 변환
        
        # 파일 이름 설정: 홀수 페이지와 짝수 페이지에 따라 다름
        if page_number % 2 == 0:  # 0부터 시작하기 때문에 실제로는 홀수 페이지
            image_filename = f"voca_high_front_{page_number // 2 + 1}.jpg"
        else:  # 짝수 페이지
            image_filename = f"voca_high_back_{page_number // 2 + 1}.jpg"
        
        # 이미지 파일 저장
        pix.save(image_filename)

# 함수 사용 예
extract_high_quality_images_from_pdf("voca_high.pdf")
