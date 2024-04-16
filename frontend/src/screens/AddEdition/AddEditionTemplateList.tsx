import { useQuery } from 'react-query';
import { pathGenerator } from '../../router/paths';
import { useNavigate } from 'react-router-dom';
import { getTemplates } from '../../api/templates';
import { AddEditionTemplateCard } from './AddEditionTemplateCard';

export const AddEditionTemplateList = () => {
  const navigate = useNavigate();
  const { isLoading, error, data: templates } = useQuery('templates', getTemplates);

  if (isLoading) return <p>Loading...</p>;
  if (error) navigate(pathGenerator.ErrorPage('something went wrong'));

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
        marginTop: 20,
        marginBottom: 20
      }}>
      {templates?.map((template, index) => (
        <AddEditionTemplateCard key={index} template={template} />
      ))}
    </div>
  );
};

export default AddEditionTemplateList;
