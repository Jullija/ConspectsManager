const TemplatesList = () => {
  const titles = [
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc',
    'abc'
  ];

  return (
    <>
      <h1>templates</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
          marginTop: 20,
          marginBottom: 20,
          justifyContent: 'center'
        }}>
        {titles.map((title, index) => (
          <div
            key={index}
            style={{ padding: 20, width: 340, height: 400, border: '1px solid black' }}>
            {index}. title
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplatesList;
