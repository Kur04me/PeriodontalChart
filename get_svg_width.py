import os
import xml.etree.ElementTree as ET

# SVGファイルのディレクトリ
directory = './files/'

# 横幅を保存する配列
widths = []

# ディレクトリ内のすべてのファイルをチェック
for filename in os.listdir(directory):
    # SVGファイルのみを対象
    if filename.endswith('.svg'):
        # ファイルパスを作成
        filepath = os.path.join(directory, filename)

        # SVGファイルを開く
        tree = ET.parse(filepath)

        # root element (svg) を取得
        root = tree.getroot()

        # width 属性が存在すれば、その値を取得
        if 'width' in root.attrib:
            width = root.attrib['width']
            widths.append(width)

print(widths)
