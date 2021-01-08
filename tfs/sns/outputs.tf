output rds_creation_sub_id {
    value = aws_db_event_subscription.rds_creation_subscription.id
}

output sns_creation_topic_arn {
    value = aws_sns_topic.rds_creation_topic.arn
}
