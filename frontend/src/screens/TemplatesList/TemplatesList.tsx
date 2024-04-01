import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import { Template } from '../../utils/types';
import TemplateCard from './TemplateCard';

const TemplatesList = () => {
  const templates: Template[] = [
    { title: 'template 1' },
    { title: 'template 2' },
    { title: 'template 3' }
  ];

  return (
    <>
      <div style={{ fontSize: titleFontSize, color: colors.darkblue, padding: '20px 0px' }}>
        Templates
      </div>
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
        {templates.map((template, index) => (
          <TemplateCard key={index} template={template} />
        ))}
      </div>
    </>
  );
};

export default TemplatesList;
