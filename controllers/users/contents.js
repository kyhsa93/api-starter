import { Op } from 'sequelize';
import { Contents } from '../../models';

export default async (data) => {
  const {
    id, from, to, page, category,
  } = data;

  const query = {
    where: {
      userId: id,
      deletedAt: null,
      createdAt: { [Op.between]: [from, to] },
      categoryId: category || true,
    },
    offset: (page - 1) * 10,
    limit: page * 10,
  };

  const result = await Contents.findAll(query);

  return { code: 200, data: result };
};
