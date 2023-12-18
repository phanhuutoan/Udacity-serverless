
    ImagesBucket:
      Type: "AWS::S3::Bucket"
      DeletionPolicy: Retain
      Properties:
        AccessControl: PublicRead
        BucketName: "${self:provider.environment.BUCKET_NAME}"
        CorsConfiguration:
          CorsRules:
            - AllowedMethods:
                - GET
                - PUT
                - DELETE
              AllowedOrigins:
                - "*"
        PublicAccessBlockConfiguration:
          BlockPublicAcls: false
          BlockPublicPolicy: false
          IgnorePublicAcls: false
          RestrictPublicBuckets: false
    BucketPolicy:
      Type: AWS::S3::BucketPolicy
      Properties:
        PolicyDocument:
          Id: MyPolicy
          Version: "2012-10-17"
          Statement:
            - Sid: PublicReadForGetBucketObjects
              Effect: Allow
              Principal: '*'
              Action: 's3:GetObject'
              Resource: 'arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*'
        Bucket: !Ref ImagesBucket