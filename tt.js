function CreateContent(props) {
  const [number, setNumber] = useState("1");
  const [value, setValue] = useState({1: "", 2: "", 3: "", 4: "",});
  const [content, setContent] = useState([]);
  return (
    <>
      {content}
      <Button
        onClick={(e) => {
          setNumber(() => {
            return String(Number(number) + 1);
          });
          const newContent = [...content];
          newContent.push(
            <div key={number}>
              <TextField
                name={number}
                label={number}
                value={value[Number(number)]}
                onChange={(e) => {
                  e.preventDefault();
                  const newValue = { ...value };
                  newValue[Number(number)] = e.target.value;
                  setValue(newValue);
                }}
              />
            </div>
          );
          setContent(newContent);
        }}
      >
        보기추가
      </Button>
      <Button type="submit">보기 확정</Button>
    </>
  );
}