import csv
import json

def convert_csv_to_json(csv_filepath, json_filepath):
    # CSV 파일 열기
    with open(csv_filepath, mode='r', encoding='utf-8') as csv_file:
        # CSV 파일을 딕셔너리 리스트로 변환
        csv_reader = csv.DictReader(csv_file)
        rows = list(csv_reader)

    # JSON 파일로 저장
    with open(json_filepath, mode='w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(rows, indent=4))

# 사용 예:
convert_csv_to_json('cards.csv', 'cards.json')
