"""add id in follow

Revision ID: e3fd370597a9
Revises: ce69c7302642
Create Date: 2025-03-19 12:25:18.172198

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e3fd370597a9'
down_revision = 'ce69c7302642'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.Integer(), autoincrement=True, nullable=False))
        batch_op.create_unique_constraint('unique_follow', ['follower_id', 'followed_id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.drop_constraint('unique_follow', type_='unique')
        batch_op.drop_column('id')

    # ### end Alembic commands ###
