"""remove autoincrement

Revision ID: ce69c7302642
Revises: 36037b8c5291
Create Date: 2025-03-17 21:32:36.886598

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce69c7302642'
down_revision = '36037b8c5291'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.alter_column('follower_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('followed_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_column('id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('follows', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id', sa.INTEGER(), nullable=False))
        batch_op.alter_column('followed_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('follower_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###
