import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import '@freee_jp/vibes/css';
import { Button, Container, Header, SubSectionTitle, Note, Stack, CardBase } from '@freee_jp/vibes';

const allZeimushoOptions: string[] = [
    "麹町税務署",
    "神田税務署",
    "日本橋税務署",
    "京橋税務署",
    "芝税務署",
    "四谷税務署",
    "麻布税務署",
    "小石川税務署",
    "本郷税務署",
    "東京上野税務署",
    "浅草税務署",
    "品川税務署",
    "荏原税務署",
    "大森税務署",
    "雪谷税務署",
    "蒲田税務署",
    "世田谷税務署",
    "北沢税務署",
    "玉川税務署",
    "目黒税務署",
    "渋谷税務署",
    "新宿税務署",
    "中野税務署",
    "杉並税務署",
    "荻窪税務署",
    "板橋税務署",
    "練馬東税務署",
    "練馬西税務署",
    "豊島税務署",
    "王子税務署",
    "荒川税務署",
    "足立税務署",
    "西新井税務署",
    "本所税務署",
    "向島税務署",
    "葛飾税務署",
    "江戸川北税務署",
    "江戸川南税務署",
    "江東西税務署",
    "江東東税務署",
    "青梅税務署",
    "八王子税務署",
    "日野税務署",
    "町田税務署",
    "立川税務署",
    "東村山税務署",
    "武蔵野税務署",
    "武蔵府中税務署",
    "横浜中税務署",
    "横浜南税務署",
    "保土ケ谷税務署",
    "戸塚税務署",
    "神奈川税務署",
    "緑税務署",
    "鶴見税務署",
    "川崎南税務署",
    "川崎北税務署",
    "川崎西税務署",
    "横須賀税務署",
    "鎌倉税務署",
    "藤沢税務署",
    "平塚税務署",
    "厚木税務署",
    "大和税務署",
    "相模原税務署",
    "小田原税務署",
    "千葉東税務署",
    "千葉西税務署",
    "千葉南税務署",
    "成田税務署",
    "松戸税務署",
    "柏税務署",
    "市川税務署",
    "船橋税務署",
    "佐原税務署",
    "銚子税務署",
    "東金税務署",
    "茂原税務署",
    "木更津税務署",
    "館山税務署",
    "甲府税務署",
    "山梨税務署",
    "鰍沢税務署",
    "大月税務署"
];

const App: React.FC = () => {
  const [zeimushoOptions, setZeimushoOptions] = useState<string[]>(allZeimushoOptions);
  const [currentZeimusho, setCurrentZeimusho] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedZeimushos, setSelectedZeimushos] = useState<string[]>([]);
  const generator = useRef<NodeJS.Timeout | null>(null);

  const handleButtonClick = () => {
    if (isRunning) {
      // Stop the bingo
      setIsRunning(false);
      if (generator.current) {
        clearInterval(generator.current);
        generator.current = null;
      }
      if (currentZeimusho !== '') {
        setSelectedZeimushos(prev => [...prev, currentZeimusho]);
        setZeimushoOptions(prev => prev.filter(zeimusho => zeimusho !== currentZeimusho));
      }
    } else {
      // Start the bingo
      setIsRunning(true);
      generator.current = setInterval(() => {
        const randomZeimusho = zeimushoOptions[Math.floor(Math.random() * zeimushoOptions.length)];
        setCurrentZeimusho(randomZeimusho);
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      if (generator.current) {
        clearInterval(generator.current);
      }
    };
  }, []);

  return (
    <div className="App">
      <Header mb={2} disableGutters sectionDataList={[]} logo={<SubSectionTitle>税務署BINGO</SubSectionTitle>} />
      <Container width="narrow" responsive={true}>
        <Stack gap={2}>
          <SubSectionTitle>
            Current: {currentZeimusho}
          </SubSectionTitle>

          <Button onClick={handleButtonClick}>{isRunning ? 'Stop' : 'Start'} !</Button>

          <CardBase mt={2}>
            Selected:
            {selectedZeimushos.map((zeimusho, i) => (
              <Note key={i}>{zeimusho}</Note>
            ))}
          </CardBase>
        </Stack>
      </Container>
    </div>
  );
}

export default App;
