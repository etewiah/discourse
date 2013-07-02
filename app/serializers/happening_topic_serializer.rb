# require_dependency 'age_words'
# The most basic attributes of a topic that we need to create a link for it.
class HappeningTopicSerializer < ActiveModel::Serializer
  attributes :id, :fancy_title, :slug, :posts_count
end
