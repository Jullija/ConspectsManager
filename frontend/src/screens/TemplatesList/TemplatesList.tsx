import { useQuery } from 'react-query';
import { pathGenerator } from '../../router/paths';
import { colors } from '../../utils/colors';
import { titleFontSize } from '../../utils/sizes';
import TemplateCard from './TemplateCard';
import { useNavigate } from 'react-router-dom';
import { deleteTemplate, getTemplates } from '../../api/templates';
import axios from 'axios';

const TemplatesList = () => {
  const navigate = useNavigate();
  const { isLoading, error, data: templates, refetch } = useQuery('templates', getTemplates);

  const handleDelete = async (templateId: number) => {
    try {
      await deleteTemplate(templateId);
      refetch();
    } catch (error) {
      navigate(
        pathGenerator.ErrorPage(
          axios.isAxiosError(error)
            ? JSON.stringify(error.response?.data)
            : 'Something went wrong :('
        )
      );
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) navigate(pathGenerator.ErrorPage('something went wrong'));

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
        {templates?.map((template, index) => (
          <TemplateCard
            key={index}
            template={template}
            handleDelete={() => handleDelete(template.id)}
          />
        ))}
      </div>
    </>
  );
};

export default TemplatesList;
